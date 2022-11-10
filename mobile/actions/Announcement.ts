import { urls } from "../utils/urls";
import { HttpMethod, Announcement } from "../utils/types";
import { internalRequest } from "../utils/requests";

const userAnnouncementUrl = urls.baseUrl + urls.api.user.announcement;
const adminAnnouncementUrl = urls.baseUrl + urls.api.admin.announcement;

export const adminCreateAnnouncement = async (
  title: string,
  description: string,
  date: Date
) => {
  return internalRequest<Announcement>({
    url: adminAnnouncementUrl,
    method: HttpMethod.POST,
    authRequired: true,
    body: {
      title,
      description,
      date,
    },
  });
};

export const adminGetAnnouncements = async () => {
  return internalRequest<Announcement[]>({
    url: adminAnnouncementUrl,
    method: HttpMethod.GET,
    authRequired: true,
  });
};

export const userGetAnnouncements = async () => {
  return internalRequest<Announcement[]>({
    url: userAnnouncementUrl,
    method: HttpMethod.GET,
    authRequired: true,
  });
};
