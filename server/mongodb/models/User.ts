import mongoose from "mongoose";
import { User } from "server/utils/types";

const UserSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
export default UserModel;
