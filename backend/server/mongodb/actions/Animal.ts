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
  checkUpDate?: Date,
  profileImage?: string
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
    profileImage: profileImage,
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
  checkUpDate?: Date,
  profileImage?: string
) {
  await dbConnect();
  const animal = AnimalModel.findByIdAndUpdate(
    _id,
    {
      name: name,
      totalHours: totalHours,
      subHandler: subHandler,
      dateOfBirth: dateOfBirth,
      dateOfAdoption: dateOfAdoption,
      microchipExpiration: microchipExpiration,
      checkUpDate: checkUpDate,
      dateOfTrainingClass: dateOfTrainingClass,
      profileImage: profileImage,
    },
    {
      new: true,
    }
  );

  return animal;
}

export async function deleteAnimalByUserId(userId: Types.ObjectId) {
  await dbConnect();

  const animal = AnimalModel.findOneAndDelete({
    handler: userId,
  });

  return animal;
}
