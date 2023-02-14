import { Types } from "mongoose";
import UserModel from "server/mongodb/models/User";
import VerificationLogModel from "server/mongodb/models/VerificationLog";
import dbConnect from "server/utils/dbConnect";
import { VERIFICATION_LOG_EXPIRATION_MINUTES } from "src/utils/constants";
import { User, UserVerificationLogType } from "src/utils/types";

export async function createVerificationLog(
  userId: Types.ObjectId,
  type: UserVerificationLogType
) {
  await dbConnect();

  const user = await UserModel.findById(userId).exec();
  const code = Math.floor(100000 + Math.random() * 900000);
  const email = (user as User).email;
  const issueDate = new Date();
  const expirationDate = new Date(
    issueDate.getTime() + VERIFICATION_LOG_EXPIRATION_MINUTES * 60000
  );

  const verificationLog = await VerificationLogModel.create({
    code,
    user: userId,
    email,
    type,
    issueDate,
    expirationDate,
    isVerified: false,
    expired: false,
    attempts: 0,
  });

  return verificationLog;
}

export async function updateVerificationLog(
  id: Types.ObjectId,
  isVerified?: boolean,
  expired?: boolean,
  attempts?: number
) {
  await dbConnect();

  const verificationLog = await VerificationLogModel.findByIdAndUpdate(id, {
    isVerified,
    expired,
    attempts,
  });

  return verificationLog;
}

export async function getLatestVerificationLog(
  userId: Types.ObjectId | string
) {
  await dbConnect();

  const logs = await VerificationLogModel.find({ user: userId }).exec();

  let latestLog = undefined;
  for (const log of logs) {
    if (latestLog === undefined || log.issueDate > latestLog.issueDate) {
      latestLog = log;
    }
  }

  return latestLog;
}
