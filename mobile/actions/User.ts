import { internalRequest } from "../utils/requests";
import { HandlerType, HttpMethod, Role, User } from "../utils/types";
import { urls } from "../utils/urls";

const userUserUrl = urls.baseUrl + urls.api.user.user;
const userRegistrationComplete =
  urls.baseUrl + urls.api.user.registrationComplete;

export const userGetUserInfo = async () => {
  return internalRequest<User>({
    url: userUserUrl,
    method: HttpMethod.GET,
    authRequired: true,
  });
};

export const userCreateUser = async (
  email: string,
  firebaseUid: string,
  birthday?: Date,
  firstName?: string,
  lastName?: string,
  handlerType?: HandlerType,
  profileImage?: string
) => {
  return internalRequest<User>({
    url: userUserUrl,
    method: HttpMethod.POST,
    body: {
      email,
      firebaseUid,
      firstName,
      lastName,
      handlerType,
      birthday,
      profileImage,
    },
  });
};

export const userUpdateUser = async (
  roles?: Array<Role>,
  birthday?: Date,
  firstName?: string,
  lastName?: string,
  handlerType?: HandlerType,
  profileImage?: string
) => {
  return internalRequest<User>({
    url: userUserUrl,
    method: HttpMethod.PATCH,
    authRequired: true,
    body: {
      roles,
      birthday,
      firstName,
      lastName,
      handlerType,
      profileImage,
    },
  });
};

export const userSetRegistationComplete = async () => {
  return internalRequest<User>({
    url: userRegistrationComplete,
    method: HttpMethod.PATCH,
    authRequired: true,
  });
};

export const userGetRegistrationComplete = async (email: string) => {
  return internalRequest<User>({
    url: userRegistrationComplete,
    method: HttpMethod.GET,
    queryParams: {
      email,
    },
  });
};
