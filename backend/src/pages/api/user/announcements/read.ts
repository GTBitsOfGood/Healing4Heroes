import { Types } from "mongoose";
import {
  createReadLog,
  hasReadLog,
  getReadAnnouncements,
} from "server/mongodb/actions/ReadLog";
import APIWrapper from "server/utils/APIWrapper";
import { getUser } from "server/utils/Authentication";
import { Role } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const accessToken: string = req.headers.accesstoken as string;
      const user = await getUser(accessToken);

      const announcement: Types.ObjectId = new Types.ObjectId(
        req.body.announcement as string
      );

      const readLogExists = await hasReadLog(announcement, user._id);
      if (readLogExists) return null;

      const date: Date = req.body.date as Date;

      const readLog = await createReadLog(announcement, user._id, date);

      if (!readLog) {
        throw new Error("Failed to create read log");
      }

      return readLog;
    },
  },
  GET: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const accessToken: string = req.headers.accesstoken as string;
      const user = await getUser(accessToken);

      const readAnnouncements = await getReadAnnouncements(user._id);

      return readAnnouncements;
    },
  },
});
