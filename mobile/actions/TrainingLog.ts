import { urls } from "../utils/urls";
import { ServiceAnimalBehavior } from "../../backend/src/utils/types";
import { HttpMethod, TrainingLog } from "../utils/types";
import { internalRequest } from "../utils/requests";
import { Types } from "mongoose";

const userTrainingLogUrl = urls.baseUrl + urls.api.user.training;
const adminTrainingLogUrl = urls.baseUrl + urls.api.admin.training;

export const userCreateTrainingLog = async (
  date: Date,
  description: string,
  skills: Array<string>,
  trainingHours: number,
  behavior: ServiceAnimalBehavior,
  animal: Types.ObjectId,
  handler: Types.ObjectId,
  video?: string
) => {
  return internalRequest<TrainingLog>({
    url: userTrainingLogUrl,
    method: HttpMethod.POST,
    authRequired: true,
    body: {
      date,
      description,
      skills,
      trainingHours,
      behavior,
      animal,
      handler,
      video,
    },
  });
};

export const userGetTrainingLogs = async () => {
  return internalRequest<TrainingLog>({
    url: userTrainingLogUrl,
    method: HttpMethod.GET,
    authRequired: true,
  });
};

export const adminGetTrainingLogs = async (userId: Types.ObjectId) => {
  return internalRequest<TrainingLog>({
    url: adminTrainingLogUrl,
    method: HttpMethod.GET,
    authRequired: true,
    body: { userId },
  });
};
