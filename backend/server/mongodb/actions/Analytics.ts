import AnalyticsModel from "server/mongodb/models/Analytics";
import AnimalModel from "server/mongodb/models/Animal";
import TrainingLogModel from "server/mongodb/models/TrainingLog";
import UserModel from "server/mongodb/models/User";
import dbConnect from "server/utils/dbConnect";
import { Analytics, BehaviorTypes } from "src/utils/types";

const NEGATIVE_BEHAVIOR_LOG_GRAPH_LENGTH = 12;
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const ACTIVE_USERS_CALCULATION_WINDOW = ONE_DAY_IN_MS * 14;

interface AggregateSum {
  _id: number;
  total: number;
}

async function getNegativeBehaviorLogGraph(): Promise<number[]> {
  await dbConnect();

  const result: number[] = new Array<number>(
    NEGATIVE_BEHAVIOR_LOG_GRAPH_LENGTH
  ).fill(0);

  /* the week starts on a sunday */
  const currentYear = new Date().getFullYear();
  const currentWeek = getCurrentWeek();

  const negativeBehaviorLogs: AggregateSum[] = await TrainingLogModel.aggregate(
    [
      {
        $project: {
          year: { $year: "$date" },
          week: { $week: "$date" },
          behavior: "$behavior",
        },
      },
      {
        $match: {
          year: { $eq: currentYear },
          week: { $gt: currentWeek - NEGATIVE_BEHAVIOR_LOG_GRAPH_LENGTH },
          behavior: { $ne: BehaviorTypes.NO_NEGATIVE_BEHAVIOR },
        },
      },
      {
        $group: {
          _id: "$week",
          total: { $count: {} },
        },
      },
    ]
  );

  /* the most recent week is located at index 0 */
  for (let i = 0; i < negativeBehaviorLogs.length; i++) {
    const index = currentWeek - negativeBehaviorLogs[i]._id;
    result[index] = negativeBehaviorLogs[i].total;
  }

  return result;
}

const getCurrentWeek = () => {
  const currentDate = new Date();
  const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);

  const daysPassedThisYear = Math.floor(
    (currentDate.getTime() - firstDayOfYear.getTime()) / ONE_DAY_IN_MS
  );

  return Math.ceil(daysPassedThisYear / 7);
};

async function getCumulativeTrainingHours(): Promise<number[]> {
  await dbConnect();

  const result: number[] = new Array<number>(12).fill(0);

  const currentYear = new Date().getFullYear();
  const cumulativeHours: AggregateSum[] = await TrainingLogModel.aggregate([
    {
      $project: {
        year: { $year: "$date" },
        month: { $month: "$date" },
        trainingHours: "$trainingHours",
      },
    },
    {
      $match: {
        year: { $eq: currentYear },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$trainingHours" },
      },
    },
  ]);

  /* months are zero-indexed, i.e. January is 0 */
  for (let i = 0; i < cumulativeHours.length; i++) {
    const index = cumulativeHours[i]._id - 1;
    result[index] = cumulativeHours[i].total;
  }

  return result;
}

async function getActiveUsers() {
  await dbConnect();

  return (
    await TrainingLogModel.find({
      date: { $gte: new Date(Date.now() - ACTIVE_USERS_CALCULATION_WINDOW) },
    }).distinct("handler")
  ).length;
}

export async function initializeAnalytics() {
  await dbConnect();

  const totalUsers = await UserModel.countDocuments({ verifiedByAdmin: true });
  const activeUsers = await getActiveUsers();
  const usersCompletedTraining = await AnimalModel.countDocuments({
    totalHours: { $gte: 800 },
  });
  const negativeBehaviorLogGraph = await getNegativeBehaviorLogGraph();
  const cumulativeTrainingHours = await getCumulativeTrainingHours();

  const analytics: Analytics = {
    totalUsers,
    activeUsers,
    usersCompletedTraining,
    negativeBehaviorLogGraph,
    cumulativeTrainingHours,
    currentYear: new Date().getFullYear(),
  };

  return AnalyticsModel.updateOne({}, analytics, {
    upsert: true,
    setDefaultsOnInsert: true,
  });
}

// returns true if Analytics didn't exist and had to be initialized
async function ensureAnalyticsIsInitialized(): Promise<boolean> {
  await dbConnect();

  if (await AnalyticsModel.findOne()) {
    return false;
  }

  await initializeAnalytics();
  return true;
}

export async function getAnalytics() {
  await dbConnect();

  if (await ensureAnalyticsIsInitialized()) {
    return AnalyticsModel.findOne();
  }

  /* activeUsers and negativeBehaviorLogGraph are not dynamically
  updated, so they must be manually updated prior to retrieval */
  await updateActiveUsers();
  await updateNegativeBehaviorLogGraph();

  return AnalyticsModel.findOne();
}

async function updateActiveUsers() {
  await dbConnect();

  if (await ensureAnalyticsIsInitialized()) {
    return;
  }

  const activeUsers = await getActiveUsers();
  return AnalyticsModel.findOneAndUpdate({}, { $set: { activeUsers } });
}

async function updateNegativeBehaviorLogGraph() {
  await dbConnect();

  if (await ensureAnalyticsIsInitialized()) {
    return;
  }

  const negativeBehaviorLogGraph = await getNegativeBehaviorLogGraph();
  return AnalyticsModel.updateOne({}, { $set: { negativeBehaviorLogGraph } });
}

export async function incrementTotalUsers() {
  await dbConnect();

  if (await ensureAnalyticsIsInitialized()) {
    return;
  }

  return AnalyticsModel.updateOne({}, { $inc: { totalUsers: 1 } });
}

export async function decrementTotalUsers() {
  await dbConnect();

  if (await ensureAnalyticsIsInitialized()) {
    return;
  }

  return AnalyticsModel.updateOne({}, { $inc: { totalUsers: -1 } });
}

export async function incrementUsersCompletedTraining() {
  await dbConnect();

  if (await ensureAnalyticsIsInitialized()) {
    return;
  }

  return AnalyticsModel.updateOne({}, { $inc: { usersCompletedTraining: 1 } });
}

export async function updateCumulativeTrainingHours(hours: number) {
  await dbConnect();

  const date = new Date();
  const currentYear = date.getFullYear();

  const analytics = await AnalyticsModel.findOne();
  // if we're in a new year, we should just recalculate everything
  if (!analytics || analytics.currentYear != currentYear) {
    await initializeAnalytics();
    return;
  }

  const currentMonth = date.getMonth();
  return AnalyticsModel.updateOne(
    {},
    { $inc: { [`cumulativeTrainingHours.${currentMonth}`]: hours } }
  );
}
