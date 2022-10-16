import { internalRequest } from "../utils/requests";
import { HandlerType, HttpMethod, Role, User } from "../utils/types";
import { urls } from "../utils/urls";
import { Types } from "mongoose";

const userUserUrl = urls.baseUrl + urls.api.user.user;
const adminUserUrl = urls.baseUrl + urls.api.admin.user;
const adminUserVerifiedUrl = urls.baseUrl + urls.api.admin.userVerified;

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
  roles: Array<Role>,
  birthday?: Date,
  firstName?: string,
  lastName?: string,
  handlerType?: HandlerType
) => {
  return internalRequest<User>({
    url: userUserUrl,
    method: HttpMethod.POST,
    body: {
      email,
      firebaseUid,
      roles,
      firstName,
      lastName,
      handlerType,
      birthday,
    },
  });
};

export const userUpdateUser = async (
  roles?: Array<Role>,
  birthday?: Date,
  firstName?: string,
  lastName?: string,
  handlerType?: HandlerType
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
    },
  });
};

export const adminGetUsers = async (
  pageSize: number,
  afterId?: Types.ObjectId
) => {
  return internalRequest<User[]>({
    url: adminUserUrl,
    method: HttpMethod.GET,
    authRequired: true,
    body: {
      afterId,
      pageSize,
    },
  });
};

export const adminVerifyUser = async (userId: Types.ObjectId) => {
  return internalRequest<User[]>({
    url: adminUserVerifiedUrl,
    method: HttpMethod.PATCH,
    authRequired: true,
    body: {
      userId,
    },
  });
};
