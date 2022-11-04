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
  birthday: Date;
  roles?: Array<Role>;
  profileImage?: string;
  verifiedByAdmin: boolean;
  emailVerified: boolean;
}

export interface ServiceAnimal {
  _id: Types.ObjectId;
  name: string;
  totalHours: number;
  handler: User | Types.ObjectId;
  subHandler?: SubHandler;
  dateOfTrainingClass?: Date;
  dateOfBirth?: Date;
  dateOfAdoption?: Date;
  microchipExpiration?: Date;
  checkUpDate?: Date;
  profileImage?: string;
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
  handler: Types.ObjectId;
  video?: string;
}

export interface Announcement {
  _id: Types.ObjectId;
  title: string;
  description: string;
  date: Date;
  sender: Types.ObjectId;
}

export interface ReadLog {
  _id: Types.ObjectId;
  announcement: Types.ObjectId;
  user: Types.ObjectId;
  readAt: Date;
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

export enum UserVerificationLogType {
  EMAIL_VERIFICATION = "email verification",
  PASSWORD_RESET = "password reset",
}

export interface VerificationLog {
  _id: Types.ObjectId; // ObjectId of the Verification Log
  code: number; // randomly generated 6-digit code the user receives in the email
  user: Types.ObjectId; // _id of the user we sent the code to
  email: string; // email the code is sent to
  type: UserVerificationLogType; // two values (for now) --> UserVerificationLogType.EMAIL_VERIFICATION or UserVerificationLogType.PASSWORD_RESET
  issueDate: Date; // the day and time the code was issued
  expirationDate: Date; // The day and time the code expires (should always be 60 mins after the issueDate)
  isVerified: boolean; // Used to indicate if the verification attempt succeeded (i.e. the user sent the right 6 digit code)
  expired: boolean; // Used to indicate if the verification log has already been used / expired --> if so, it cannot be reused and the user must request a new one
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
