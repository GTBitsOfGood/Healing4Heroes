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
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  handlerType: {
    type: String,
    required: true,
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
