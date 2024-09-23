import { Types } from "mongoose";
import { internalRequest } from "../utils/requests";
import { SubHandler, HttpMethod, ServiceAnimal } from "../utils/types";
import { urls } from "../utils/urls";

const userAnimalUrl = urls.baseUrl + urls.api.user.animal;
const adminAnimalUrl = urls.baseUrl + urls.api.admin.animal;

export const userCreateAnimal = async (
  name: string,
  totalHours?: number,
  subHandler?: SubHandler,
  dateOfTrainingClass?: Date,
  dateOfBirth?: Date,
  dateOfAdoption?: Date,
  dateOfRabiesShot?: Date,
  rabiesShotTimeInterval?: number,
  microchipExpiration?: Date,
  checkUpDate?: Date,
  profileImage?: string
) => {
  return internalRequest<ServiceAnimal>({
    url: userAnimalUrl,
    method: HttpMethod.POST,
    authRequired: true,
    body: {
      name,
      totalHours,
      subHandler,
      dateOfTrainingClass,
      dateOfBirth,
      dateOfAdoption,
      dateOfRabiesShot,
      rabiesShotTimeInterval,
      microchipExpiration,
      checkUpDate,
      profileImage,
    },
  });
};

export const userUpdateAnimal = async (
  name?: string,
  totalHours?: number,
  subHandler?: SubHandler,
  dateOfBirth?: Date,
  dateOfAdoption?: Date,
  dateOfRabiesShot?: Date,
  rabiesShotTimeInterval?: number,
  dateOfTrainingClass?: Date,
  microchipExpiration?: Date,
  checkUpDate?: Date,
  profileImage?: string
) => {
  return internalRequest<ServiceAnimal>({
    url: userAnimalUrl,
    method: HttpMethod.PATCH,
    authRequired: true,
    body: {
      name,
      totalHours,
      subHandler,
      dateOfTrainingClass,
      dateOfBirth,
      dateOfAdoption,
      dateOfRabiesShot,
      rabiesShotTimeInterval,
      microchipExpiration,
      checkUpDate,
      profileImage,
    },
  });
};

export const adminUpdateAnimal = async (
  userId: Types.ObjectId,
  name?: string,
  totalHours?: number,
  subHandler?: SubHandler,
  dateOfBirth?: Date,
  dateOfAdoption?: Date,
  dateOfRabiesShot?: Date,
  rabiesShotTimeInterval?: number,
  microchipExpiration?: Date,
  checkUpDate?: Date,
  dateOfTrainingClass?: Date,
  profileImage?: string
) => {
  return internalRequest<ServiceAnimal>({
    url: adminAnimalUrl,
    method: HttpMethod.PATCH,
    authRequired: true,
    body: {
      userId,
      name,
      totalHours,
      subHandler,
      dateOfBirth,
      dateOfAdoption,
      dateOfRabiesShot,
      rabiesShotTimeInterval,
      microchipExpiration,
      checkUpDate,
      dateOfTrainingClass,
      profileImage,
    },
  });
};

export const userGetAnimal = async () => {
  return internalRequest<ServiceAnimal>({
    url: userAnimalUrl,
    method: HttpMethod.GET,
    authRequired: true,
  });
};
