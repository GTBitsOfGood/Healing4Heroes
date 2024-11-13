import { Types } from "mongoose";
import { updateCumulativeTrainingHours } from "server/mongodb/actions/Analytics";
import {
  createTrainingLog,
  getTrainingLogs,
} from "server/mongodb/actions/TrainingLog";
import APIWrapper from "server/utils/APIWrapper";
import { getUser, sendEmail } from "server/utils/Authentication";
import { BehaviorTypes, Role, User, ServiceAnimal } from "src/utils/types";
import { findAnimalByUserId } from "server/mongodb/actions/Animal";
import { EmailSubject, EmailTemplate } from "src/utils/types";

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
      const behavior: BehaviorTypes[] = req.body.behavior as BehaviorTypes[];
      const behaviorNote: string = req.body.behaviorNote as string;
      const animal: Types.ObjectId = req.body.animal as Types.ObjectId;
      const video: string = req.body.video as string;
      const videoThumbnail: string = req.body.videoThumbnail as string;

      const handler: User = await getUser(req.headers.accesstoken as string);

      const trainingLog = await createTrainingLog(
        date,
        description,
        skills,
        trainingHours,
        behavior,
        behaviorNote,
        animal,
        handler._id,
        video,
        videoThumbnail
      );
      if (!trainingLog) {
        throw new Error("Failed to create training log");
      }

      const handlerAnimal: ServiceAnimal | null = await findAnimalByUserId(
        handler._id
      );

      if (
        handlerAnimal &&
        ((handlerAnimal.totalHours < 800 &&
          handlerAnimal.totalHours + trainingHours >= 800) ||
          (handlerAnimal.totalHours < 1600 &&
            handlerAnimal.totalHours + trainingHours >= 1600) ||
          (handlerAnimal.totalHours < 3200 &&
            handlerAnimal.totalHours + trainingHours >= 3200))
      ) {
        await sendEmail(
          "logs@healing4heroes.org",
          EmailSubject.HOURS_NOTIFICATION,
          EmailTemplate.HOURS_NOTIFICATION,
          {
            handlerName: handler.firstName + " " + handler.lastName,
            animalName: handlerAnimal.name,
            thresholdAchieved:
              handlerAnimal.totalHours < 800
                ? "800"
                : handlerAnimal.totalHours < 1600
                  ? "1600"
                  : "3200",
          }
        );
      }

      await updateCumulativeTrainingHours(trainingHours);

      return trainingLog;
    },
  },
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

      const userId = user._id;
      const trainingLogs = await getTrainingLogs(userId);

      return trainingLogs;
    },
  },
});
