import { initializeAnalytics } from "server/mongodb/actions/Analytics";
import APIWrapper from "server/utils/APIWrapper";
import { Role } from "src/utils/types";

export default APIWrapper({
  PUT: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async () => {
      await initializeAnalytics();
    },
  },
});
