import { Types } from "mongoose";
import AnimalModel from "server/mongodb/models/Animal";
import dbConnect from "server/utils/dbConnect";
import { SubHandler } from "src/utils/types";

export async function createAnimal(
  name: string,
  totalHours?: number,
  handler?: Types.ObjectId,
  subHandler?: SubHandler,
  dateOfTrainingClass?: Date,
  dateOfBirth?: Date,
  dateOfAdoption?: Date,
  microchipExpiration?: Date,
  checkUpDate?: Date
) {
  await dbConnect();
  const animal = await AnimalModel.create({
    name: name,
    totalHours: totalHours,
    handler: handler,
    subHandler: subHandler,
    dateOfTrainingClass: dateOfTrainingClass,
    dateOfBirth: dateOfBirth,
    dateOfAdoption: dateOfAdoption,
    microchipExpiration: microchipExpiration,
    checkUpDate: checkUpDate,
  });

  return animal;
}

export async function findAnimalByUserId(id: Types.ObjectId) {
  await dbConnect();

  return AnimalModel.findOne({ handler: id }).exec();
}
