import { internalRequest } from "../utils/requests";
import { SubHandler, HttpMethod, ServiceAnimal } from "../utils/types";
import { urls } from "../utils/urls";

const animalUrl = urls.baseUrl + urls.api.animal;

export const createAnimal = async (
  totalHours?: number,
  subHandler?: SubHandler,
  dateOfBirth?: Date,
  dateOfAdoption?: Date,
  microchipExpiration?: Date,
  checkUpDate?: Date
) => {
  return internalRequest<ServiceAnimal>({
    url: animalUrl,
    method: HttpMethod.POST,
    body: {
      totalHours,
      subHandler,
      dateOfBirth,
      dateOfAdoption,
      microchipExpiration,
      checkUpDate,
    },
  });
};
