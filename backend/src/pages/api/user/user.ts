import {
  createUser,
  findUserByFirebaseUid,
  updateUser,
} from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { getUser } from "server/utils/Authentication";
import { HandlerType, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const accessToken: string = req.headers.accesstoken as string;
      const user = await getUser(accessToken);

      if (!user) {
        throw new Error("User not found in database!");
      }

      return user;
    },
  },
  POST: {
    config: {},
    handler: async (req) => {
      const email: string = req.body.email as string;
      const birthday: Date = req.body.birthday as Date;
      const firebaseUid: string = req.body.firebaseUid as string;
      const roles: Array<Role> = req.body.roles as Array<Role>;
      const firstName: string = req.body.firstName as string;
      const lastName: string = req.body.lastName as string;
      const handlerType: HandlerType = req.body.handlerType as HandlerType;

      const dbUser = await findUserByFirebaseUid(firebaseUid);
      if (dbUser) {
        throw new Error("User already exists in database!");
      }

      const user = await createUser(
        email,
        firebaseUid,
        roles,
        birthday,
        firstName,
        lastName,
        handlerType
      );
      if (!user) {
        throw new Error("Failed to create user!");
      }

      return user;
    },
  },
  PATCH: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const accessToken: string = req.headers.accesstoken as string;
      const birthday: Date = req.body.birthday as Date;
      const firstName: string = req.body.firstName as string;
      const lastName: string = req.body.lastName as string;
      const handlerType: HandlerType = req.body.handlerType as HandlerType;
      const roles: Array<Role> = req.body.roles as Array<Role>;

      const user = await getUser(accessToken);

      if (!user) {
        throw new Error("User not found in database!");
      }

      const updatedUser = await updateUser(
        user._id,
        birthday,
        roles,
        firstName,
        lastName,
        handlerType
      );

      if (!updatedUser?.modifiedPaths) {
        throw new Error("Failed to update user!");
      }

      return updatedUser;
    },
  },
});
