import { internalRequest } from "../utils/requests";
import {
  HandlerType,
  HttpMethod,
  Role,
  User,
  UserFilter,
} from "../utils/types";
import { urls } from "../utils/urls";
import { Types } from "mongoose";

const userUserUrl = urls.baseUrl + urls.api.user.user;

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
