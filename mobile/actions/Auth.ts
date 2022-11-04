import { urls } from "../utils/urls";
import { Types } from "mongoose";
import { HttpMethod, UserVerificationLogType } from "../utils/types";
import { internalRequest } from "../utils/requests";

const authVerifyUrl = urls.baseUrl + urls.api.auth.verify;

export const authCreateVerificationLog = async (userId: Types.ObjectId, type: UserVerificationLogType) => {
  return internalRequest<Date>({
    url: authVerifyUrl,
    method: HttpMethod.POST,
    authRequired: false,
    body: {
      userId,
      type,
    }
  })
}

export const authAttemptVerification = async (userId: Types.ObjectId, code: number) => {
  return internalRequest<Date>({
    url: authVerifyUrl,
    method: HttpMethod.PATCH,
    authRequired: false,
    body: {
      userId,
      code,
    }
  })
}
