import { Types } from "mongoose";
import { deleteAnimalByUserId } from "server/mongodb/actions/Animal";
import { deleteUserByUserId, verifyUser } from "server/mongodb/actions/User";
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
      return user;
    },
  },
});
