import { urls } from "../utils/urls";
import { HttpMethod, ReadLog } from "../utils/types";
import { internalRequest } from "../utils/requests";
import { Types } from "mongoose";

const userReadLogUrl = urls.baseUrl + urls.api.user.readLog;

export const userCreateReadLog = async (
  announcement: Types.ObjectId | string,
  date?: Date
) => {
  return internalRequest<ReadLog>({
    url: userReadLogUrl,
    method: HttpMethod.POST,
    authRequired: true,
    body: {
      announcement,
      date,
    },
  });
};

export const userGetReadAnnouncements = async () => {
  return internalRequest<Array<any>>({
    url: userReadLogUrl,
    method: HttpMethod.GET,
    authRequired: true,
  });
};
