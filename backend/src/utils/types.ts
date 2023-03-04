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
  behavior: BehaviorTypes[];
  animal: Types.ObjectId;
  handler: Types.ObjectId;
  behaviorNote?: string;
  video?: string;
  videoThumbnail?: string;
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

export enum ServiceAnimalSkills {
  SKILL_POST_BLOCK = "Post/Block",
  SKILL_LEAD_FOLLOW = "Lead/Follow",
  SKILL_STAY_SIT_DOWN = "Stay/Sit/Down",
  SKILL_TOUCH = "Touch",
  SKILL_TUCK = "Tuck",
  SKILL_HEEL = "Heel",
  SKILL_WAKE_NIGHTMARES = "Wake/Nightmares",
  SKILL_REMIND_HANDLER_TAKE_MEDICINE = "Remind/Handler/Take/Medicine",
  SKILL_SWEEP_ROOM_BAD_GUYS = "Sweep/Room/Bad/Guys",
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
  attempts: number; // number of attempts taken to input this verification code
}

export enum BehaviorTypes {
  NO_NEGATIVE_BEHAVIOR = "No Negative Behavior",
  BITING = "Biting",
  UNPROVOKED_BARKING = "Unprovoked Barking",
  AGRESSIVE_PULLING = "Agressive Pulling",
  UNCONTROLLED_JUMPING = "Uncontrolled Jumping",
  GETTING_TRASH_TOILET = "Getting Into Trash / Toilet",
  GROWLING_AGRESSIVE_BEHAVIOR = "Growling or Showing Agressive Behavior",
  OTHER = "Other",
}

export interface Analytics {
  /* total # of verified users */
  totalUsers: number;

  /* # of users who submitted a log in the past 2 weeks */
  activeUsers: number;

  /* # of users with 800+ hours logged */
  usersCompletedTraining: number;

  /* array of length 12 with # of negative behavior logs/week in past 12 weeks.*/
  negativeBehaviorLogGraph: number[];

  /* array of length 12 with # of cumulative training hours per month for the current year. */
  cumulativeTrainingHours: number[];

  currentYear: number;
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

export interface MultipartUpload {
  UploadId: string;
  Key: string;
}

export interface UploadedPart {
  ETag: string;
  PartNumber: number;
}
/* Email Utils*/

export enum EmailSubject {
  EMAIL_VERIFICATION = "Verify Your Email for Healing4Heroes",
  PASSWORD_RESET = "Reset Your Password for Healing4Heroes",
}

export enum EmailTemplate {
  EMAIL_VERIFICATION = "verify",
  PASSWORD_RESET = "reset",
}

/* User Retrieval */

export enum UserFilter {
  NONPROFIT_USERS = "users",
  NONPROFIT_ADMINS = "admins",
  UNVERIFIED_USERS = "unverified users",
  WITH_800_HOURS_USERS = "users with 800 users",
  WITHOUT_800_HOURS_USERS = "users without 800 hours",
}

export enum StorageLocation {
  HANDLER_PICTURES = "HandlerPictures/",
  SERVICE_ANIMAL_PICTURES = "ServiceAnimalPictures/",
  TRAINING_LOG_VIDEOS = "TrainingLogVideos/",
  TRAINING_LOG_THUMBNAILS = "TrainingLogThumbnail/",
}
