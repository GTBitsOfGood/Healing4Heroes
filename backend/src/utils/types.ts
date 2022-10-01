import { Types } from "mongoose";
import { NextApiRequest } from "next";

export enum Role {
  NONPROFIT_ADMIN = "Nonprofit Admin",
  NONPROFIT_USER = "Nonprofit User",
}

export enum HandlerType {
  HANDLER_VETERAN = "Veteran",
  HANDLER_CIVILIAN = "Civilian",
  HANDLER_CHILD = "Child",
  HANDLER_FIRST_RESPONDER = "First Responder/LEO",
  HANDLER_SURVIVING_FAMILY_MEMBER = "Surviving Family Member",
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
  name: string;
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
  animal: Types.ObjectId;
  video?: string;
}

export interface ServiceAnimalBehavior {
  description: string;
  repeat: number;
}

export enum ServiceAnimalSkills {
  SKILL_POST_BLOCK = "Post/Block",
  SKILL_LEAD_FOLLOW = "Lead/Follow",
  SKILL_STAY_SIT_DOWN = "Stay/Sit/Down",
  SKILL_TOUCH = "Touch",
  SKILL_TUCK = "Tuck",
  SKILL_HEEL = "Heel",
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
