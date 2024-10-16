import mongoose from "mongoose";
import { HandlerType, Role, User } from "src/utils/types";

const UserSchema = new mongoose.Schema<User>({
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
    default: Date.now()
  },
  address: {
    type: String,
    required: true,
    default: ""
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

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
export default UserModel;
