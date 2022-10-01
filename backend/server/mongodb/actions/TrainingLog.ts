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
    video,
  });
  return trainingLog;
}
