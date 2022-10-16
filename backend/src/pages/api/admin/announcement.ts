import {
  createAnnouncement,
  getAnnouncements,
} from "server/mongodb/actions/Announcement";
import APIWrapper from "server/utils/APIWrapper";
import { getUser } from "server/utils/Authentication";
import { User, Role } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const accessToken: string = req.headers.accesstoken as string;
      const sender: User = await getUser(accessToken);

      const title: string = req.body.title as string;
      const description: string = req.body.description as string;
      const date: Date = req.body.date as Date;

      const announcement = await createAnnouncement(
        sender._id,
        title,
        description,
        date
      );

      return announcement;
    },
  },
  GET: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async () => {
      const announcements = await getAnnouncements();

      return announcements;
    },
  },
});
