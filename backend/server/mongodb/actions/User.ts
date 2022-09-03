import { Types } from "mongoose";
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
  firstName: string,
  lastName: string,
  handlerType: HandlerType
) {
  await dbConnect();
  const user = await UserModel.create({
    email: email,
    firebaseUid: firebaseUid,
    roles: roles,
    firstName: firstName,
    lastName: lastName,
    handlerType: handlerType,
  });
  return user;
}
