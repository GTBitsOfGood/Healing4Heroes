import { Types } from "mongoose";
import { NextApiRequest } from "next";

export enum Role {
  NONPROFIT_ADMIN = "Nonprofit Admin",
  NONPROFIT_USER = "Nonprofit User",
}

export enum HandlerType {
  HANDLER_VETERAN = "veteran",
  HANDLER_CIVILIAN = "civilian",
  HANDLER_CHILD = "child",
}

export interface User {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  firebaseUid: string;
  handlerType: HandlerType;
  roles?: Array<Role>;
}

export interface ServiceAnimal {
  _id: Types.ObjectId;
  totalHours: number;
  handler: User | Types.ObjectId;
  subHandler?: SubHandler;
  dateOfBirth?: Date;
  dateOfAdoption?: Date;
  microchipExpiration?: Date;
  checkUpDate?: Date;
}

export interface SubHandler {
  name: string;
  relation: string;
  type: HandlerType;
}

export interface TrainingLog {
  _id: Types.ObjectId;
  date: Date;
  description: string;
  skills: Array<string>;
  trainingHours: number;
  behavior: ServiceAnimalBehavior;
  animal: ServiceAnimal | Types.ObjectId;
  video?: string;
}

export interface ServiceAnimalBehavior {
  description: string;
  repeat: number;
}

/* Internal Request & API Wrapper Types */

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface InternalRequest extends NextApiRequest {
  body: { [key: string]: unknown };
}

export interface InternalRequestData {
  url: string;
  method: HttpMethod;
  body?: { [key: string]: unknown };
  queryParams?: { [key: string]: string | number | boolean | undefined };
}

export interface InternalResponseData<T> {
  success: boolean;
  message?: string;
  payload?: T;
}
