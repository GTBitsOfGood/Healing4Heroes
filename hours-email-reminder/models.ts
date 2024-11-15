import mongoose from "mongoose";
import {  HandlerType, Role, User, ServiceAnimal } from "./types";
const { Schema } = mongoose;

const UserSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  annualPetVisitDay: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  nextPrescriptionReminder: {
    type: Date,
    required: false,
  },
  address: {
    type: String,
    required: true,
    default: "",
  },
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  birthday: {
    type: Date,
    required: false,
  },
  handlerType: {
    type: String,
    required: false,
    enum: Object.values(HandlerType),
  },
  roles: {
    type: [String],
    required: true,
    enum: Object.values(Role),
    default: [],
  },
  verifiedByAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  profileImage: {
    type: String,
    required: false,
  },
  emailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});
export const UserModel = mongoose.models.User  as mongoose.Model<User> || mongoose.model("User", UserSchema);



const AnimalSchema = new Schema<ServiceAnimal>({
  handler: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  totalHours: {
    type: Number,
    required: true,
    default: 0,
  },
  subHandler: {
    name: {
      type: String,
      required: false,
    },
    relation: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      enum: Object.values(HandlerType),
    },
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  dateOfAdoption: {
    type: Date,
    required: false,
  },
  dateOfRabiesShot: {
    type: Date,
    required: false,
  },
  rabiesShotTimeInterval: {
    type: Number,
    required: false,
  },
  dateOfTrainingClass: {
    type: Date,
    required: false,
  },
  microchipExpiration: {
    type: Date,
    required: false,
  },
  checkUpDate: {
    type: Date,
    required: false,
  },
  profileImage: {
    type: String,
    required: false,
  },
});
export const AnimalModel = mongoose.models.Animal as mongoose.Model<ServiceAnimal> ||  mongoose.model<ServiceAnimal>("Animal", AnimalSchema);
