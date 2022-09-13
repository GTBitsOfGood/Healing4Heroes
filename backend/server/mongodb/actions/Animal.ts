import { Types } from "mongoose";
import AnimalModel from "server/mongodb/models/Animal";
import dbConnect from "server/utils/dbConnect";
import { SubHandler } from "src/utils/types";

export async function createAnimal(
  totalHours: number, // TODO: user flow for totalHours (default to 0?)
  handler: Types.ObjectId,
  subHandler?: SubHandler,
  dateOfBirth?: Date,
  dateOfAdoption?: Date,
  microchipExpiration?: Date,
  checkUpDate?: Date
) {
  await dbConnect();
  const animal = await AnimalModel.create({
    totalHours: totalHours,
    handler: handler,
    subHandler: subHandler,
    dateOfBirth: dateOfBirth,
    dateOfAdoption: dateOfAdoption,
    microchipExpiration: microchipExpiration,
    checkUpDate: checkUpDate,
  });
  console.log("Hello World");

  return animal;
}
