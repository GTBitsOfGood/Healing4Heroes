import { internalRequest } from "../utils/requests";
import {
  Analytics,
  HttpMethod,
  ServiceAnimal,
  TrainingLog,
  User,
  UserFilter,
} from "../utils/types";
import { urls } from "../utils/urls";
import { Types } from "mongoose";

const adminUserUrl = urls.baseUrl + urls.api.admin.user;
const adminUserVerifiedUrl = urls.baseUrl + urls.api.admin.userVerified;
const adminAnimalUrl = urls.baseUrl + urls.api.admin.animal;
const adminTrainingLogUrl = urls.baseUrl + urls.api.admin.training;
const adminAnalyticsUrl = urls.baseUrl + urls.api.admin.analytics;

export const adminGetUsers = async (
  pageSize: number,
  afterId?: Types.ObjectId | string,
  filter?: UserFilter,
  searchText?: string
) => {
  return internalRequest<User[]>({
    url: adminUserUrl,
    method: HttpMethod.POST,
    authRequired: true,
    body: {
      afterId,
      pageSize,
      filter,
      searchText,
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

export const adminDeleteUser = async (userId: Types.ObjectId | string) => {
  return internalRequest<User>({
    url: adminUserVerifiedUrl,
    method: HttpMethod.DELETE,
    authRequired: true,
    body: {
      userId,
    },
  });
};

export const adminGetAnimalInfo = async (userId: Types.ObjectId | string) => {
  return internalRequest<ServiceAnimal>({
    url: adminAnimalUrl,
    method: HttpMethod.GET,
    authRequired: true,
    queryParams: {
      userId: userId.toString(),
    },
  });
};
export const adminGetTrainingLogs = async (userId: Types.ObjectId | string) => {
  return internalRequest<TrainingLog[]>({
    url: adminTrainingLogUrl,
    method: HttpMethod.GET,
    authRequired: true,
    queryParams: { userId: userId.toString() },
  });
};

export const adminGetAnalytics = async () => {
  return internalRequest<Analytics>({
    url: adminAnalyticsUrl,
    method: HttpMethod.GET,
    authRequired: true,
  });
};
