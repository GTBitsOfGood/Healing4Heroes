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
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  birthday: {
    type: Date,
    required: true,
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
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
export default UserModel;
