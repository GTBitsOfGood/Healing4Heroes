import { Types } from "mongoose";
import { updateCumulativeTrainingHours } from "server/mongodb/actions/Analytics";
import {
  createTrainingLog,
  getTrainingLogs,
} from "server/mongodb/actions/TrainingLog";
import APIWrapper from "server/utils/APIWrapper";
import { getUser } from "server/utils/Authentication";
import { BehaviorTypes, Role, User } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const date: Date = req.body.date as Date;
      const description: string = req.body.description as string;
      const skills: Array<string> = req.body.skills as Array<string>;
      const trainingHours: number = req.body.trainingHours as number;
      const behavior: BehaviorTypes[] = req.body.behavior as BehaviorTypes[];
      const behaviorNote: string = req.body.behaviorNote as string;
      const animal: Types.ObjectId = req.body.animal as Types.ObjectId;
      const video: string = req.body.video as string;
      const videoThumbnail: string = req.body.videoThumbnail as string;

      const handler: User = await getUser(req.headers.accesstoken as string);

      const trainingLog = await createTrainingLog(
        date,
        description,
        skills,
        trainingHours,
        behavior,
        behaviorNote,
        animal,
        handler._id,
        video,
        videoThumbnail
      );
      if (!trainingLog) {
        throw new Error("Failed to create training log");
      }

      await updateCumulativeTrainingHours(trainingHours);

      return trainingLog;
    },
  },
  GET: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const accessToken: string = req.headers.accesstoken as string;
      const user = await getUser(accessToken);

      if (!user) {
        throw new Error("User not found in database!");
      }

      const userId = user._id;
      const trainingLogs = await getTrainingLogs(userId);

      return trainingLogs;
    },
  },
});
