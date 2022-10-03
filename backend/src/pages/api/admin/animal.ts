import { Types } from "mongoose";
import { findAnimal, updateAnimal } from "server/mongodb/actions/Animal";
import APIWrapper from "server/utils/APIWrapper";
import { getUser } from "server/utils/Authentication";
import { User, SubHandler, Role } from "src/utils/types";

export default APIWrapper({
  PATCH: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const stringId: string = req.body.stringId as string;
      const _id: Types.ObjectId = new Types.ObjectId(stringId);
      const name: string = req.body.name as string;
      const totalHours: number = req.body.totalHours as number;

      const subHandler: SubHandler = req.body.subHandler as SubHandler;
      const dateOfBirth: Date = req.body.dateOfBirth as Date;
      const dateOfAdoption: Date = req.body.dateOfAdoption as Date;
      const microchipExpiration: Date = req.body.microchipExpiration as Date;
      const checkUpDate: Date = req.body.checkUpDate as Date;

      const res = await updateAnimal(
        _id,
        name,
        totalHours,
        subHandler,
        dateOfBirth,
        dateOfAdoption,
        microchipExpiration,
        checkUpDate
      );

      if (res.modifiedCount == 0) {
        throw new Error("Failed to update service animal's information.");
      }

      const animal = findAnimal(_id);
      return animal;
    },
  },
});
