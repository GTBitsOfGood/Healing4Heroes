import { internalRequest } from "../utils/requests";
import { SubHandler, HttpMethod, ServiceAnimal } from "../utils/types";
import { urls } from "../utils/urls";

const animalUrl = urls.baseUrl + urls.api.user.animal;

export const userCreateAnimal = async (
  name: string,
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
    authRequired: true,
    body: {
      name,
      totalHours,
      subHandler,
      dateOfBirth,
      dateOfAdoption,
      microchipExpiration,
      checkUpDate,
    },
  });
};

export const userGetAnimal = async () => {
  return internalRequest<ServiceAnimal>({
    url: animalUrl,
    method: HttpMethod.GET,
    authRequired: true,
  });
};
