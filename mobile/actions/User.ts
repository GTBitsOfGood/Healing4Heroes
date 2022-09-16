import { internalRequest } from "../utils/requests";
import { HandlerType, HttpMethod, Role, User } from "../utils/types";
import { urls } from "../utils/urls";

const userUrl = urls.baseUrl + urls.api.user;

export const getUserInfo = async () => {
  return internalRequest<User>({
    url: userUrl,
    method: HttpMethod.GET,
    authRequired: true,
  });
};

export const createUser = async (
  email: string,
  firebaseUid: string,
  roles: Array<Role>,
  firstName?: string,
  lastName?: string,
  handlerType?: HandlerType
) => {
  return internalRequest<User>({
    url: userUrl,
    method: HttpMethod.POST,
    body: {
      email,
      firebaseUid,
      roles,
      firstName,
      lastName,
      handlerType,
    },
  });
};

export const updateUser = async (
  roles?: Array<Role>,
  firstName?: string,
  lastName?: string,
  handlerType?: HandlerType
) => {
  return internalRequest<User>({
    url: userUrl,
    method: HttpMethod.PATCH,
    authRequired: true,
    body: {
      roles,
      firstName,
      lastName,
      handlerType,
    },
  });
};
