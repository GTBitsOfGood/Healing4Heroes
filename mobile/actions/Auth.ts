import { urls } from "../utils/urls";
import { Types } from "mongoose";
import { HttpMethod, UserVerificationLogType } from "../utils/types";
import { internalRequest } from "../utils/requests";

const authVerifyUrl = urls.baseUrl + urls.api.auth.verify;

export const authCreateVerificationLog = async (
  email: string,
  type: UserVerificationLogType
) => {
  return internalRequest<Date>({
    url: authVerifyUrl,
    method: HttpMethod.POST,
    authRequired: false,
    body: {
      email,
      type,
    },
  });
};

export const authAttemptVerification = async (email: string, code: number) => {
  return internalRequest<Date>({
    url: authVerifyUrl,
    method: HttpMethod.PATCH,
    authRequired: false,
    body: {
      email,
      code,
    },
  });
};
