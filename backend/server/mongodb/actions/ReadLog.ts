import { Types } from "mongoose";
import ReadLogModel from "server/mongodb/models/ReadLog";
import dbConnect from "server/utils/dbConnect";

export async function createReadLog(
  announcement: Types.ObjectId,
  user: Types.ObjectId,
  date?: Date
) {
  await dbConnect();
  const readLog = await ReadLogModel.create({
    announcement,
    user,
    date,
  });
  return readLog;
}

export async function hasReadLog(
  announcement: Types.ObjectId,
  user: Types.ObjectId
) {
  await dbConnect();
  const foundAnnouncement = await ReadLogModel.find({
    announcement: announcement,
    user: user,
  });

  if (foundAnnouncement.length) return true;
  return false;
}

export async function getReadAnnouncements(user: Types.ObjectId) {
  await dbConnect();
  const readAnnouncements = await ReadLogModel.find(
    { user: user },
    {
      announcement: 1,
      _id: 0,
    }
  );

  return readAnnouncements;
}

export async function deleteReadLogsByUser(userId: Types.ObjectId) {
  await dbConnect();

  const readLogs = await ReadLogModel.deleteMany({ user: userId });

  return readLogs;
}
