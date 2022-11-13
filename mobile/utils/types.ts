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
}

export enum ServiceAnimalSkills {
  SKILL_POST_BLOCK = "Post/Block",
  SKILL_LEAD_FOLLOW = "Lead/Follow",
  SKILL_STAY_SIT_DOWN = "Stay/Sit/Down",
  SKILL_TOUCH = "Touch",
  SKILL_TUCK = "Tuck",
  SKILL_HEEL = "Heel",
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
  handler: User | Types.ObjectId;
  name: string;
  totalHours: number;
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
  behavior: BehaviorTypes;
  animal: Types.ObjectId;
  handler: Types.ObjectId;
  behaviorNote?: string;
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
  AGRESSIVE_PULLING = "Agressive Pulling",
  UNCONTROLLED_JUMPING = "Uncontrolled Jumping",
  GETTING_TRASH_TOILET = "Getting Into Trash / Toilet",
  GROWLING_AGRESSIVE_BEHAVIOR = "Growling or Showing Agressive Behavior",
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
  ADMIN_USER_VERIFICATION_SCREEN = "Admin User Verification",
  STORAGE_EXAMPLE_SCREEN = "Storage Example Screen",
  STEP_OVERLAY_EXAMPLE_SCREEN = "Step Overlay Example Screen",
  VIEW_ALL_LOGS_SCREEN = "View All Logs Screen",
  VIEW_SINGLE_LOG_SCREEN = "View Single Log Screen",
  PASSCODE_VALIDATION_SCREEN = "Passcode Screen",
  UPLOAD_PROFILE_IMAGE_SCREEN = "Upload Profile Image Screen",
  CREATE_ANNOUNCEMENT_SCREEN = "Create Announcement",
  FORGOT_PASSWORD_SCREEN = "Forgot Password",
  RESET_PASSWORD_SCREEN = "Reset Password",
}

export enum UserFilter {
  NONPROFIT_USERS = "users",
  NONPROFIT_ADMINS = "admins",
  UNVERIFIED_USERS = "unverified users",
  WITH_800_HOURS_USERS = "users with 800 users",
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

export interface MultipartUpload {
  UploadId: string;
  Key: string;
}

export interface UploadedPart {
  ETag: string;
  PartNumber: number;
}
