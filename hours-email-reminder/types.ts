import { Types } from "mongoose";

export enum Role {
    NONPROFIT_ADMIN = "Nonprofit Admin",
    NONPROFIT_USER = "Nonprofit User",
  }

export interface User {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    annualPetVisitDay: Date;
    nextPrescriptionReminder: Date;
    firebaseUid: string;
    handlerType: HandlerType;
    birthday: Date;
    roles?: Array<Role>;
    profileImage?: string;
    verifiedByAdmin: boolean;
    emailVerified: boolean;
}

export enum HandlerType {
    HANDLER_VETERAN = "Veteran",
    HANDLER_CIVILIAN = "Civilian",
    HANDLER_CHILD = "Child",
    HANDLER_FIRST_RESPONDER = "First Responder/LEO",
    HANDLER_SURVIVING_FAMILY_MEMBER = "Surviving Family Member",
  }

export enum UserFilter {
    NONPROFIT_USERS = "users",
    NONPROFIT_ADMINS = "admins",
    UNVERIFIED_USERS = "unverified users",
    WITH_800_HOURS_USERS = "users with 800 users",
    WITHOUT_800_HOURS_USERS = "users without 800 hours",
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
