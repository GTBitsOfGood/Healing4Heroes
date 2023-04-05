import { Types } from "mongoose";
import {
  decrementTotalUsers,
  incrementTotalUsers,
} from "server/mongodb/actions/Analytics";
import { deleteAnimalByUserId } from "server/mongodb/actions/Animal";
import { deleteTrainingLogsByUser } from "server/mongodb/actions/TrainingLog";
import { deleteUserByUserId, verifyUser } from "server/mongodb/actions/User";
import { deleteVerificationLogsByUser } from "server/mongodb/actions/VerificationLog";
import APIWrapper from "server/utils/APIWrapper";
import { removeUserFromFirebase } from "server/utils/Authentication";
import { Role, ServiceAnimal, User } from "src/utils/types";

export default APIWrapper({
  PATCH: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const userId: Types.ObjectId = req.body.userId as Types.ObjectId;

      const users = await verifyUser(userId);

      await incrementTotalUsers();

      return users;
    },
  },
  DELETE: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const userId: Types.ObjectId = req.body.userId as Types.ObjectId;
      const user: User = (await deleteUserByUserId(userId)) as User;

      if (!user) {
        throw new Error("User does not exist in database!");
      }

      (await deleteAnimalByUserId(userId)) as ServiceAnimal;
      await removeUserFromFirebase(user.firebaseUid);
      await deleteTrainingLogsByUser(userId);
      await deleteVerificationLogsByUser(userId);

      if (user.verifiedByAdmin) {
        await decrementTotalUsers();
      }

      return user;
    },
  },
});
