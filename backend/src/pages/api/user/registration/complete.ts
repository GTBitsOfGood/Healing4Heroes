import {
  findUserByEmail,
  setRegistrationComplete,
} from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { getUser } from "server/utils/Authentication";
import { Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireToken: false,
      requireAdminVerification: false,
      requireEmailVerified: false,
    },
    handler: async (req) => {
      const email: string = req.query.email as string;

      const user = await findUserByEmail(email);
      if (!user) {
        throw new Error("User with specified email not found");
      }

      return user.registrationComplete;
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
      const user = await getUser(accessToken);

      if (!user) {
        throw new Error("User not found in database!");
      }

      return setRegistrationComplete(user._id);
    },
  },
});
