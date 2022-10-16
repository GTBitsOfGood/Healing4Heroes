import { Types } from "mongoose";
import { getUsers, verifyUser } from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { Role } from "src/utils/types";

export default APIWrapper({
  PATCH: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const userId: Types.ObjectId = req.body.userId as Types.ObjectId;

      const users = verifyUser(userId);

      return users;
    },
  },
});
