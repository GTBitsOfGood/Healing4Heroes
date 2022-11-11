import { getAnnouncements } from "server/mongodb/actions/Announcement";
import APIWrapper from "server/utils/APIWrapper";
import { Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireToken: true,
      requireAdminVerification: false,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async () => {
      const announcements = await getAnnouncements();

      return announcements;
    },
  },
});
