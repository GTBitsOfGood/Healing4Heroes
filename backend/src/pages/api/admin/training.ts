import { getTrainingLogs } from "server/mongodb/actions/TrainingLog";
import APIWrapper from "server/utils/APIWrapper";
import { Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const userId: string = req.query.userId as string;
      const trainingLogs = await getTrainingLogs(userId);

      return trainingLogs;
    },
  },
});
