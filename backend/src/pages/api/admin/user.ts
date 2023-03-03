import { Types } from "mongoose";
import { adminGetUsers } from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { Role, UserFilter } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      /* TODO: probably add a check to see if its a valid objectId,
          and if not, indicate that in the response. */
      const afterId: Types.ObjectId = req.body.afterId as Types.ObjectId;
      const pageSize: number = req.body.pageSize as number;
      const filter: UserFilter | undefined = req.body.filter as
        | UserFilter
        | undefined;

      const users = await adminGetUsers(pageSize, afterId, filter);

      return users;
    },
  },
});
