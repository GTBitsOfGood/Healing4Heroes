import { Types } from "mongoose";
import { getUsers } from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      /* TODO: probably add a check to see if its a valid objectId,
          and if not, indicate that in the response. */
      const afterId: Types.ObjectId = req.body.afterId as Types.ObjectId;
      const pageSize: number = req.body.pageSize as number;

      const users = await getUsers(pageSize, afterId);

      return users;
    },
  },
});
