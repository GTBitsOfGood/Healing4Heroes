import { urls } from "../utils/urls";
import {
  BehaviorTypes,
  HttpMethod,
  ServiceAnimalSkills,
  TrainingLog,
} from "../utils/types";
import { internalRequest } from "../utils/requests";
import { Types } from "mongoose";

const userTrainingLogUrl = urls.baseUrl + urls.api.user.training;

export const userCreateTrainingLog = async (
  date: Date,
  skills: Array<ServiceAnimalSkills>,
  trainingHours: number,
  behavior: BehaviorTypes[],
  behaviorNote: string,
  animal: Types.ObjectId,
  description?: string,
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
      behaviorNote,
      animal,
      video,
    },
  });
};

export const userGetTrainingLogs = async () => {
  return internalRequest<Array<TrainingLog>>({
    url: userTrainingLogUrl,
    method: HttpMethod.GET,
    authRequired: true,
  });
};
