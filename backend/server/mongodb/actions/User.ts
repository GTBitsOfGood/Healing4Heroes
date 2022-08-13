import { Types } from "mongoose";
import UserModel from "server/mongodb/models/User";
import dbConnect from "server/utils/dbConnect";

export async function findUserById(userId: Types.ObjectId) {
  await dbConnect();
  const user = await UserModel.findById(userId);
  return user;
}
