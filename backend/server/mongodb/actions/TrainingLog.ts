import { Types } from "mongoose";
import TrainingLogModel from "server/mongodb/models/TrainingLog";
import dbConnect from "server/utils/dbConnect";

export async function createTrainingLog(
  date: Date,
  description: string,
  skills: Array<string>,
  trainingHours: number,
  behavior: string,
  animal: Types.ObjectId,
  handler: Types.ObjectId,
  video: string
) {
  await dbConnect();
  const trainingLog = await TrainingLogModel.create({
    date,
    description,
    skills,
    trainingHours,
    behavior,
    animal,
    handler,
    video,
  });
  return trainingLog;
}

export async function getTrainingLogs(userId: Types.ObjectId) {
  await dbConnect();
  const trainingLogs = await TrainingLogModel.find({ handler: userId });
  return trainingLogs;
}
