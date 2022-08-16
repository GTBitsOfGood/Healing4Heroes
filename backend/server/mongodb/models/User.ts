import mongoose from "mongoose";
import { Role, User } from "src/utils/types";

const UserSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
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
