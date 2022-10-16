import { Schema, Types } from "mongoose";
import UserModel from "server/mongodb/models/User";
import dbConnect from "server/utils/dbConnect";
import { HandlerType, Role } from "src/utils/types";

export async function findUserById(userId: Types.ObjectId) {
  await dbConnect();
  const user = await UserModel.findById(userId);
  return user;
}

export async function findUserByFirebaseUid(firebaseUid: string) {
  await dbConnect();
  const user = await UserModel.findOne({ firebaseUid: firebaseUid });
  return user;
}

export async function createUser(
  email: string,
  firebaseUid: string,
  roles: Array<Role>,
  birthday?: Date,
  firstName?: string,
  lastName?: string,
  handlerType?: HandlerType,
  profileImage?: string
) {
  await dbConnect();
  const user = await UserModel.create({
    email: email,
    firebaseUid: firebaseUid,
    roles: roles,
    birthday: birthday,
    firstName: firstName,
    lastName: lastName,
    handlerType: handlerType,
    profileImage: profileImage,
  });
  return user;
}

export async function updateUser(
  userId: Types.ObjectId,
  birthday?: Date,
  roles?: Array<Role>,
  firstName?: string,
  lastName?: string,
  handlerType?: HandlerType,
  profileImage?: string
) {
  await dbConnect();
  const user = UserModel.findByIdAndUpdate(userId, {
    roles: roles,
    firstName: firstName,
    lastName: lastName,
    handlerType: handlerType,
    birthday: birthday,
    profileImage: profileImage,
  });
  return user;
}

export async function verifyUser(userId: Types.ObjectId) {
  await dbConnect();

  const user = UserModel.findByIdAndUpdate(
    userId,
    { verifiedByAdmin: true },
    { new: true }
  );

  return user;
}

export async function getUsers(pageSize: number, afterId?: Types.ObjectId) {
  await dbConnect();

  if (!afterId) {
    return UserModel.find().limit(pageSize);
  }

  return UserModel.find({ _id: { $gt: afterId } }).limit(pageSize);
}
