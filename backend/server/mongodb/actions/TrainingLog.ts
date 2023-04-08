import { Types } from "mongoose";
import TrainingLogModel from "server/mongodb/models/TrainingLog";
import dbConnect from "server/utils/dbConnect";
import { BehaviorTypes } from "src/utils/types";

export async function createTrainingLog(
  date: Date,
  description: string,
  skills: Array<string>,
  trainingHours: number,
  behavior: BehaviorTypes[],
  behaviorNote: string,
  animal: Types.ObjectId,
  handler: Types.ObjectId,
  video: string,
  videoThumbnail: string
) {
  await dbConnect();
  const trainingLog = await TrainingLogModel.create({
    date,
    description,
    skills,
    trainingHours,
    behavior,
    behaviorNote,
    animal,
    handler,
    video,
    videoThumbnail,
  });
  return trainingLog;
}

export async function getTrainingLogs(userId: Types.ObjectId | string) {
  await dbConnect();
  const trainingLogs = await TrainingLogModel.find({ handler: userId });
  return trainingLogs;
}

export async function deleteTrainingLogsByUser(userId: Types.ObjectId) {
  await dbConnect();

  const trainingLogs = await TrainingLogModel.deleteMany({ handler: userId });

  return trainingLogs;
}
