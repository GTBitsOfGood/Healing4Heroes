import { urls } from "../utils/urls";
import { HttpMethod, ServiceAnimalSkills, TrainingLog } from "../utils/types";
import { internalRequest } from "../utils/requests";
import { Types } from "mongoose";

const trainingLogUrl = urls.baseUrl + urls.api.user.training;

export const userCreateTrainingLog = async (
  date: Date,
  skills: Array<ServiceAnimalSkills>,
  trainingHours: number,
  behavior: string,
  animal: Types.ObjectId,
  description?: string,
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
