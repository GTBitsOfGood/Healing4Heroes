import { Types } from "mongoose";
import {
  createUser,
  findUserByFirebaseUid,
  findUserById,
} from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireToken: false,
      roles: [],
    },
    handler: async (req) => {
      const userId = new Types.ObjectId(req.query.userId as string);

      if (!userId) {
        throw new Error("User id cannot be null.");
      }

      const user = await findUserById(userId);

      if (!user) {
        throw new Error(
          `Could not find user with userId: ${userId.toString()}`
        );
      }

      return user;
    },
  },
  POST: {
    config: {},
    handler: async (req) => {
      const email: string = req.body.email as string;
      const firebaseUid: string = req.body.firebaseUid as string;
      const roles: Array<Role> = req.body.roles as Array<Role>;

      const dbUser = await findUserByFirebaseUid(firebaseUid);
      if (dbUser) {
        throw new Error("User already exists in database!");
      }

      const user = await createUser(email, firebaseUid, roles);
      if (!user) {
        throw new Error("Failed to create user!");
      }

      return user;
    },
  },
});
