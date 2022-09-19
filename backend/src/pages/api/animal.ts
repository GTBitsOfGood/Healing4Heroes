import { createAnimal } from "server/mongodb/actions/Animal";
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

      const totalHours: number = req.body.totalHours as number;
      const subHandler: SubHandler = req.body.subHandler as SubHandler;
      const dateOfBirth: Date = req.body.dateOfBirth as Date;
      const dateOfAdoption: Date = req.body.dateOfAdoption as Date;
      const microchipExpiration: Date = req.body.microchipExpiration as Date;
      const checkUpDate: Date = req.body.checkUpDate as Date;

      const animal = await createAnimal(
        totalHours,
        handler._id,
        subHandler,
        dateOfBirth,
        dateOfAdoption,
        microchipExpiration,
        checkUpDate
      );

      if (!animal) {
        throw new Error("Failed to create animal");
      }

      return animal;
    },
  },
});