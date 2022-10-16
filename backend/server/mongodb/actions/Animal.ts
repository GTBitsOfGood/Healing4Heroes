import { Types } from "mongoose";
import AnimalModel from "server/mongodb/models/Animal";
import dbConnect from "server/utils/dbConnect";
import { SubHandler } from "src/utils/types";

export async function createAnimal(
  handler: Types.ObjectId,
  name: string,
  totalHours?: number,
  subHandler?: SubHandler,
  dateOfTrainingClass?: Date,
  dateOfBirth?: Date,
  dateOfAdoption?: Date,
  microchipExpiration?: Date,
  checkUpDate?: Date
) {
  await dbConnect();
  const animal = await AnimalModel.create({
    handler: handler,
    name: name,
    totalHours: totalHours,
    subHandler: subHandler,
    dateOfTrainingClass: dateOfTrainingClass,
    dateOfBirth: dateOfBirth,
    dateOfAdoption: dateOfAdoption,
    microchipExpiration: microchipExpiration,
    checkUpDate: checkUpDate,
  });

  return animal;
}

export async function findAnimalByUserId(handlerId: Types.ObjectId) {
  await dbConnect();

  const animal = AnimalModel.findOne({ handler: handlerId });

  return animal;
}

export async function updateAnimal(
  _id: Types.ObjectId,
  name?: string,
  totalHours?: number,
  subHandler?: SubHandler,
  dateOfTrainingClass?: Date,
  dateOfBirth?: Date,
  dateOfAdoption?: Date,
  microchipExpiration?: Date,
  checkUpDate?: Date
) {
  await dbConnect();
  const animal = AnimalModel.updateOne(
    { _id: _id },
    {
      $set: {
        name: name,
        totalHours: totalHours,
        subHandler: subHandler,
        dateOfBirth: dateOfBirth,
        dateOfAdoption: dateOfAdoption,
        microchipExpiration: microchipExpiration,
        checkUpDate: checkUpDate,
        dateOfTrainingClass: dateOfTrainingClass,
      },
    }
  );

  return animal;
}
