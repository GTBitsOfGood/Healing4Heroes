import { internalRequest } from "../utils/requests";
import { HttpMethod, Role, User } from "../utils/types";
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

export const createUser = async (
  email: string,
  firebaseUid: string,
  roles: Array<Role>
) => {
  return internalRequest<User>({
    url: userUrl,
    method: HttpMethod.POST,
    body: {
      email,
      firebaseUid,
      roles,
    },
  });
};
