import {urls} from "../utils/urls";
import {ServiceAnimalBehavior} from "../../backend/src/utils/types";
import {HttpMethod, TrainingLog} from "../utils/types";
import {internalRequest} from "../utils/requests";

const trainingLogUrl = urls.baseUrl + urls.api.training;

export const getTrainingLog = async (
  date: Date,
  description: string,
  skills: Array<string>,
  trainingHours: number,
  behavior: ServiceAnimalBehavior,
  animal: unknown, // TODO: replace with the actual type
  video: string,
) => {
  return internalRequest<TrainingLog>({
    url: trainingLogUrl,
    method: HttpMethod.POST,
    body: {
      date,
      description,
      skills,
      trainingHours,
      behavior,
      animal,
      video
    },
  });
};
