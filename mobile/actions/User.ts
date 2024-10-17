import { internalRequest } from "../utils/requests";
import { HandlerType, HttpMethod, Role, User } from "../utils/types";
import { urls } from "../utils/urls";

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
  address?: string,
  birthday?: Date,
  firstName?: string,
  lastName?: string,
  handlerType?: HandlerType,
  profileImage?: string,
  annualPetVisitDay?: Date,
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
      address,
      annualPetVisitDay,
    },
  });
};

export const userUpdateUser = async (
  roles?: Array<Role>,
  birthday?: Date,
  firstName?: string,
  lastName?: string,
  handlerType?: HandlerType,
  address?: string,
  annualPetVisitDay?: Date,
  profileImage?: string,
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
      address,
      annualPetVisitDay,
      profileImage,
    },
  });
};
