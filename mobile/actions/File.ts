import { urls } from "../utils/urls";
import { HttpMethod, MultipartUpload, UploadedPart } from "../utils/types";
import { internalRequest } from "../utils/requests";

const userInitFileUploadUrl = urls.baseUrl + urls.api.user.fileUpload.init;
const userGetFileUploadUrlsUrl = urls.baseUrl + urls.api.user.fileUpload.urls;
const userCompleteFileUploadUrl =
  urls.baseUrl + urls.api.user.fileUpload.complete;

export const userInitFileUpload = async (filename: string) => {
  return internalRequest<MultipartUpload>({
    url: userInitFileUploadUrl,
    method: HttpMethod.POST,
    authRequired: true,
    body: {
      filename,
    },
  });
};

export const userGetFileUploadUrls = async (
  uploadId: string,
  key: string,
  parts: number
) => {
  return internalRequest<string[]>({
    url: userGetFileUploadUrlsUrl,
    method: HttpMethod.POST,
    authRequired: true,
    body: {
      uploadId,
      key,
      parts,
    },
  });
};

export const userCompleteFileUpload = async (
  uploadId: string,
  key: string,
  parts: UploadedPart[]
) => {
  return internalRequest<string>({
    url: userCompleteFileUploadUrl,
    method: HttpMethod.POST,
    authRequired: true,
    body: {
      uploadId,
      key,
      parts,
    },
  });
};
