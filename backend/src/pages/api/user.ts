import { Types } from "mongoose";
import { findUserById } from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";

export default APIWrapper({
  GET: {
    config: {},
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
});
