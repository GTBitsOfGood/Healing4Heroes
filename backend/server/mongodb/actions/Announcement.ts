import { Types } from "mongoose";
import AnnouncementModel from "server/mongodb/models/Announcement";
import dbConnect from "server/utils/dbConnect";

export async function createAnnouncement(
  sender: Types.ObjectId,
  title: string,
  description: string,
  date?: Date
) {
  await dbConnect();
  const announcement = await AnnouncementModel.create({
    sender,
    title,
    description,
    date,
  });
  return announcement;
}

export async function getAnnouncements() {
  await dbConnect();
  const announcements = await AnnouncementModel.find();
  return announcements;
}
