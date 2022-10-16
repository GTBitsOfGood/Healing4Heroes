import { Types } from "mongoose";
import {
  createAnnouncement,
  getAnnouncements,
} from "server/mongodb/actions/Announcement";
import APIWrapper from "server/utils/APIWrapper";
import { Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async () => {
      const announcements = await getAnnouncements();

      return announcements;
    },
  },
});
