import { incrementUsersCompletedTraining } from "server/mongodb/actions/Analytics";
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
      requireAdminVerification: false,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const accessToken: string = req.headers.accesstoken as string;
      const handler: User = await getUser(accessToken);

      const name: string = req.body.name as string;
      const totalHours: number = req.body.totalHours as number;
      const subHandler: SubHandler = req.body.subHandler as SubHandler;
      const dateOfTrainingClass: Date = req.body.dateOfTrainingClass as Date;
      const dateOfBirth: Date = req.body.dateOfBirth as Date;
      const dateOfAdoption: Date = req.body.dateOfAdoption as Date;
      const dateOfRabiesShot: Date = req.body.dateOfRabiesShot as Date;
      const rabiesShotTimeInterval: number = req.body.rabiesShotTimeInterval as number;
      const microchipExpiration: Date = req.body.microchipExpiration as Date;
      const checkUpDate: Date = req.body.checkUpDate as Date;
      const profileImage: string = req.body.profileImage as string;

      const prevAnimal = await findAnimalByUserId(handler._id);

      if (prevAnimal) {
        throw new Error("This user already has a service animal");
      }

      const animal = await createAnimal(
        handler._id,
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

      if (!animal) {
        throw new Error("Failed to create service animal.");
      }

      return animal;
    },
  },
  PATCH: {
    config: {
      requireToken: true,
      requireAdminVerification: false,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const accessToken: string = req.headers.accesstoken as string;
      const handler: User = await getUser(accessToken);

      const name: string = req.body.name as string;
      const totalHours: number = req.body.totalHours as number;
      const subHandler: SubHandler = req.body.subHandler as SubHandler;
      const dateOfTrainingClass: Date = req.body.dateOfTrainingClass as Date;
      const dateOfBirth: Date = req.body.dateOfBirth as Date;
      const dateOfAdoption: Date = req.body.dateOfAdoption as Date;
      const dateOfRabiesShot: Date = req.body.dateOfRabiesShot as Date;
      const rabiesShotTimeInterval: number = req.body.rabiesShotTimeInterval as number;
      const microchipExpiration: Date = req.body.microchipExpiration as Date;
      const checkUpDate: Date = req.body.checkUpDate as Date;
      const profileImage: string = req.body.profileImage as string;

      const animal = await findAnimalByUserId(handler._id);

      if (!animal) {
        throw new Error("Failed to update service animal's information.");
      }

      const res = await updateAnimal(
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

      if (animal.totalHours < 800 && totalHours >= 800) {
        await incrementUsersCompletedTraining();
      }

      return res;
    },
  },
  GET: {
    config: {
      requireToken: true,
      requireAdminVerification: false,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const accessToken: string = req.headers.accesstoken as string;
      const handler: User = await getUser(accessToken);

      const animal = await findAnimalByUserId(handler._id);

      if (!animal) {
        throw new Error("Animal not found in database!");
      }

      return animal;
    },
  },
});
