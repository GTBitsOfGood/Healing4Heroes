import TrainingLogModel from "server/mongodb/models/TrainingLog";
import dbConnect from "server/utils/dbConnect";
import { ServiceAnimalBehavior } from "src/utils/types";

export async function createTrainingLog(
  date: Date,
  description: string,
  skills: Array<string>,
  trainingHours: number,
  behavior: ServiceAnimalBehavior,
  animal: unknown, // TODO: replace with the actual type
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
