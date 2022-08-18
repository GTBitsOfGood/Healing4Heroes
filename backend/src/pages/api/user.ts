import { createUser, findUserByFirebaseUid } from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { getUser } from "server/utils/Authentication";
import { Role } from "src/utils/types";

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
      const firebaseUid: string = req.body.firebaseUid as string;
      const roles: Array<Role> = req.body.roles as Array<Role>;
      const firstName: string = req.body.firstName as string;
      const lastName: string = req.body.lastName as string;

      const dbUser = await findUserByFirebaseUid(firebaseUid);
      if (dbUser) {
        throw new Error("User already exists in database!");
      }

      const user = await createUser(
        email,
        firebaseUid,
        roles,
        firstName,
        lastName
      );
      if (!user) {
        throw new Error("Failed to create user!");
      }

      return user;
    },
  },
});
