import { urls } from "../utils/urls";
import { ServiceAnimalBehavior } from "../../backend/src/utils/types";
import { HttpMethod, TrainingLog } from "../utils/types";
import { internalRequest } from "../utils/requests";
import { Types } from "mongoose";

const trainingLogUrl = urls.baseUrl + urls.api.training;

export const createTrainingLog = async (
  auth: any,
  date: Date,
  description: string,
  skills: Array<string>,
  trainingHours: number,
  behavior: ServiceAnimalBehavior,
  animal: Types.ObjectId,
  video?: string
) => {
  return internalRequest<TrainingLog>({
    url: trainingLogUrl,
    method: HttpMethod.POST,
    authRequired: true,
    body: {
      date,
      description,
      skills,
      trainingHours,
      behavior,
      animal,
      video,
    },
  });
};
