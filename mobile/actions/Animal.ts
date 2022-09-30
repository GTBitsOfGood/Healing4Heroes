import { Types } from "mongoose";
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

export const userUpdateAnimal = async (
  _id: Types.ObjectId,
  name?: string,
  totalHours?: number,
  subHandler?: SubHandler,
  dateOfBirth?: Date,
  dateOfAdoption?: Date,
  microchipExpiration?: Date,
  checkUpDate?: Date
) => {
  const stringId = _id.toString();

  return internalRequest<ServiceAnimal>({
    url: animalUrl,
    method: HttpMethod.PATCH,
    authRequired: true,
    body: {
      stringId,
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

export const adminUpdateAnimal = async (
  _id: Types.ObjectId,
  name?: string,
  totalHours?: number,
  subHandler?: SubHandler,
  dateOfBirth?: Date,
  dateOfAdoption?: Date,
  microchipExpiration?: Date,
  checkUpDate?: Date
) => {
  const stringId = _id.toString();

  return internalRequest<ServiceAnimal>({
    url: animalUrl,
    method: HttpMethod.PATCH,
    authRequired: true,
    body: {
      stringId,
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
