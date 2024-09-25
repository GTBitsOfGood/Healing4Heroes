import { Types } from "mongoose";
import {
  findAnimalByUserId,
  updateAnimal,
} from "server/mongodb/actions/Animal";
import APIWrapper from "server/utils/APIWrapper";
import { SubHandler, Role, ServiceAnimal } from "src/utils/types";

export default APIWrapper({
  PATCH: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const userId: Types.ObjectId = req.body.userId as Types.ObjectId;
      const name: string = req.body.name as string;
      const totalHours: number = req.body.totalHours as number;
      const subHandler: SubHandler = req.body.subHandler as SubHandler;
      const dateOfBirth: Date = req.body.dateOfBirth as Date;
      const dateOfAdoption: Date = req.body.dateOfAdoption as Date;
      const dateOfRabiesShot: Date = req.body.dateOfRabiesShot as Date;
      const rabiesShotTimeInterval: number = req.body.rabiesShotTimeInterval as number;
      const microchipExpiration: Date = req.body.microchipExpiration as Date;
      const checkUpDate: Date = req.body.checkUpDate as Date;
      const dateOfTrainingClass: Date = req.body.dateOfTrainingClass as Date;
      const animal = (await findAnimalByUserId(userId)) as ServiceAnimal;
      const profileImage: string = req.body.profileImage as string;

      const updatedAnimal = await updateAnimal(
        animal._id,
        name,
        totalHours,
        subHandler,
        dateOfTrainingClass,
        dateOfBirth,
        dateOfAdoption,
        dateOfRabiesShot,
        rabiesShotTimeInterval,
        microchipExpiration,
        checkUpDate,
        profileImage
      );

      return updatedAnimal;
    },
  },
  GET: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const userId: string = req.query.userId as string;
      const animal = await findAnimalByUserId(userId);

      if (!animal) {
        throw new Error("Animal for specified user was not found");
      }

      return animal;
    },
  },
});
