import { Types } from "mongoose";
import {
  createAnimal,
  updateAnimal,
  findAnimalByUserId,
} from "server/mongodb/actions/Animal";
import APIWrapper from "server/utils/APIWrapper";
import { getUser } from "server/utils/Authentication";
import { User, SubHandler, Role } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const accessToken: string = req.headers.accesstoken as string;
      const handler: User = await getUser(accessToken);

      if (!handler) {
        throw new Error("User not found in database!");
      }
      const name: string = req.body.name as string;
      const totalHours: number = req.body.totalHours as number;
      const subHandler: SubHandler = req.body.subHandler as SubHandler;
      const dateOfTrainingClass: Date = req.body.dateOfTrainingClass as Date;
      const dateOfBirth: Date = req.body.dateOfBirth as Date;
      const dateOfAdoption: Date = req.body.dateOfAdoption as Date;
      const microchipExpiration: Date = req.body.microchipExpiration as Date;
      const checkUpDate: Date = req.body.checkUpDate as Date;

      const animal = await createAnimal(
        handler._id,
        name,
        totalHours,
        subHandler,
        dateOfTrainingClass,
        dateOfBirth,
        dateOfAdoption,
        microchipExpiration,
        checkUpDate
      );

      if (!animal) {
        throw new Error("Failed to create service animal.");
      }

      return animal;
    },
  },
  PATCH: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const accessToken: string = req.headers.accesstoken as string;
      const handler: User = await getUser(accessToken);

      if (!handler) {
        throw new Error("User not found in database!");
      }

      const _id: Types.ObjectId = new Types.ObjectId(
        req.body.stringId as string
      );

      const name: string = req.body.name as string;
      const totalHours: number = req.body.totalHours as number;
      const subHandler: SubHandler = req.body.subHandler as SubHandler;
      const dateOfBirth: Date = req.body.dateOfBirth as Date;
      const dateOfAdoption: Date = req.body.dateOfAdoption as Date;
      const microchipExpiration: Date = req.body.microchipExpiration as Date;
      const dateOfTrainingClass: Date = req.body.dateOfTrainingClass as Date;
      const checkUpDate: Date = req.body.checkUpDate as Date;

      const animal = await findAnimalByUserId(_id);

      if (!animal) {
        throw new Error("Failed to update service animal's information.");
      }

      if (animal.handler !== handler) {
        throw new Error("User not authorized to update this animal.");
      }

      const res = await updateAnimal(
        _id,
        name,
        totalHours,
        subHandler,
        dateOfBirth,
        dateOfAdoption,
        microchipExpiration,
        checkUpDate,
        dateOfTrainingClass
      );

      if (res.modifiedCount == 0) {
        throw new Error("Failed to update service animal's information.");
      }

      return animal;
    },
  },
  GET: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const accessToken: string = req.headers.accesstoken as string;
      const handler: User = await getUser(accessToken);

      if (!handler) {
        throw new Error("User not found in database!");
      }

      const animal = await findAnimalByUserId(handler._id);

      if (!animal) {
        throw new Error("Animal not found in database!");
      }

      return animal;
    },
  },
});
