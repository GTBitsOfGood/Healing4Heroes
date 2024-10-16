import { Types } from "mongoose";

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

export enum StorageLocation {
  HANDLER_PICTURES = "HandlerPictures/",
  SERVICE_ANIMAL_PICTURES = "ServiceAnimalPictures/",
  TRAINING_LOG_VIDEOS = "TrainingLogVideos/",
  TRAINING_LOG_THUMBNAILS = "TrainingLogThumbnail/",
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

export interface DropDownType {
  [key: string]: ServiceAnimalSkills;
}

export interface User {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  annualPetVisitDay: Date;
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
  handler: User | Types.ObjectId;
  name: string;
  totalHours: number;
  subHandler?: SubHandler;
  dateOfTrainingClass?: Date;
  dateOfBirth?: Date;
  dateOfAdoption?: Date;
  dateOfRabiesShot?: Date;
  rabiesShotTimeInterval?: number;
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
  behavior: BehaviorTypes;
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

export interface ServiceAnimalBehavior {
  description: string;
  repeat: number;
}

export interface UserContextType {
  user: User | null;
  animal: ServiceAnimal | null;
}

export enum UserVerificationLogType {
  EMAIL_VERIFICATION = "email verification",
  PASSWORD_RESET = "password reset",
}

export enum BehaviorTypes {
  NO_NEGATIVE_BEHAVIOR = "No Negative Behavior",
  BITING = "Biting",
  UNPROVOKED_BARKING = "Unprovoked Barking",
  AGGRESSIVE_PULLING = "Aggressive Pulling",
  UNCONTROLLED_JUMPING = "Uncontrolled Jumping",
  GETTING_TRASH_TOILET = "Getting Into Trash / Toilet",
  GROWLING_AGGRESSIVE_BEHAVIOR = "Growling or Showing Aggressive Behavior",
  OTHER = "Other",
}

/* Screen Information*/
export enum Screens {
  LANDING_SCREEN = "Landing",
  DEVELOPMENT_SCREEN = "Development",
  LOGIN_SCREEN = "Login",
  SIGN_UP_SCREEN = "Sign Up",
  HANDLER_INFORMATION_SCREEN = "Handler Information",
  ANIMAL_INFORMATION_SCREEN = "Animal Information",
  ADD_TRAINING_LOG_SCREEN = "Add Training Log",
  UPLOAD_VIDEO_LOG_SCREEN = "Upload Video Log",
  USER_DASHBOARD_SCREEN = "User Dashboard",
  ADMIN_DASHBOARD_SCREEN = "Admin Dashboard",
  ADMIN_USER_LIST_SCREEN = "Admin User List",
  ADMIN_DETAILED_USER_SCREEN = "Detailed User Screen",
  STORAGE_EXAMPLE_SCREEN = "Storage Example Screen",
  STEP_OVERLAY_EXAMPLE_SCREEN = "Step Overlay Example Screen",
  VIEW_ALL_LOGS_SCREEN = "View All Logs Screen",
  VIEW_SINGLE_LOG_SCREEN = "View Single Log Screen",
  PASSCODE_VALIDATION_SCREEN = "Passcode Screen",
  UPLOAD_PROFILE_IMAGE_SCREEN = "Upload Profile Image Screen",
  CREATE_ANNOUNCEMENT_SCREEN = "Create Announcement",
  FORGOT_PASSWORD_SCREEN = "Forgot Password",
  RESET_PASSWORD_SCREEN = "Reset Password",
  VIEW_ALL_ANNOUNCEMENTS_SCREEN = "View All Announcements",
  VIEW_SINGLE_ANNOUNCEMENT_SCREEN = "View Single Announcement",
  BASE_OVERLAY_EXAMPLE_SCREEN = "Base Overlay Example Screen",
  ANALYTICS_DASHBOARD_SCREEN = "Analytics Dashboard",
  ANALYTICS_USER_LIST = "Analytics User List",
}

export enum UserFilter {
  NONPROFIT_USERS = "users",
  NONPROFIT_ADMINS = "admins",
  UNVERIFIED_USERS = "unverified users",
  WITH_800_HOURS_USERS = "users with 800 users",
  WITHOUT_800_HOURS_USERS = "users without 800 hours",
}

export enum ButtonDirection {
  BUTTON_FORWARD = "forward",
  BUTTON_BACKWARD = "backward",
}

/* Internal Request & API Wrapper Types */

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface InternalRequestData {
  url: string;
  method: HttpMethod;
  body?: { [key: string]: unknown };
  queryParams?: { [key: string]: string | number | boolean | undefined };
  authRequired?: boolean;
}

export interface InternalResponseData<T> {
  success: boolean;
  message?: string;
  payload?: T;
}

export enum DownloadState {
  NotStarted,
  InProgress,
  Complete,
}

export interface MultipartUpload {
  UploadId: string;
  Key: string;
}

export interface UploadedPart {
  ETag: string;
  PartNumber: number;
}

export class EndExecutionError extends Error {
  constructor(message: string) {
    super(message); // (1)
    this.name = "EndExecutionError"; // (2)
  }
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

export const HOLIDAYS = [
  { name: "National Donut Day!", message: "It is national donut day! The office would appreciate donuts!", month: 5, day: 6 },
  { name: "Happy Memorial Day!", message: "Remember those who sacrificed for our freedom", month: 4, day: 26 },
  { name: "Happy 4th of July!", message: "", month: 6, day: 4 },
  { name: "Happy Veterans Day!", message: "Thank you to all those who sacrificed for us", month: 10, day: 11 },
];
