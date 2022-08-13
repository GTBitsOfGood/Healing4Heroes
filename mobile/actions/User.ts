import { internalRequest } from "../utils/requests";
import { HttpMethod, User } from "../utils/types";
import { urls } from "../utils/urls";

const userUrl = urls.baseUrl + urls.api.user;

export const getUserById = async (userId: string) => {
  return internalRequest<User>({
    url: userUrl,
    method: HttpMethod.GET,
    queryParams: {
      userId,
    },
  });
};
