import { Types } from "mongoose";
import { createTrainingLog } from "server/mongodb/actions/TrainingLog";
import APIWrapper from "server/utils/APIWrapper";
import { Role, ServiceAnimalBehavior } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const date: Date = req.body.date as Date;
      const description: string = req.body.description as string;
      const skills: Array<string> = req.body.skills as Array<string>;
      const trainingHours: number = req.body.trainingHours as number;
      const behavior: ServiceAnimalBehavior = req.body
        .behavior as ServiceAnimalBehavior;
      const animal: Types.ObjectId = req.body.animal as Types.ObjectId;
      const video: string = req.body.video as string;

      const trainingLog = await createTrainingLog(
        date,
        description,
        skills,
        trainingHours,
        behavior,
        animal,
        video
      );
      if (!trainingLog) {
        throw new Error("Failed to create training log");
      }

      return trainingLog;
    },
  },
});
