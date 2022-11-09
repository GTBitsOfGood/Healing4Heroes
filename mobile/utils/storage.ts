import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import { StorageLocation, HttpMethod } from "./types";
import * as FileSystem from "expo-file-system";
import {
  userInitFileUpload,
  userGetFileUploadUrls,
  userCompleteFileUpload,
} from "../actions/File";
import { internalRequest } from "../utils/requests";

export const uploadFile = async (
  fileName: string,
  storageLocation: StorageLocation,
  fileData: string
) => {
  const storageRef = ref(storage, storageLocation + fileName);

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", fileData, true);
    xhr.send(null);
  });

  const uploadResult = await uploadBytes(storageRef, blob as Uint8Array);

  if (uploadResult) {
    return uploadResult.metadata.fullPath;
  }
  return null;
};

export const getFile = (fileFullPath: string): Promise<string> | null => {
  if (fileFullPath) {
    return getDownloadURL(ref(storage, fileFullPath));
  }
  return null;
};

export const uploadVideo = async (
  filename: string,
  fileUri: string
): Promise<string> => {
  const fileData = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  console.log("hello");

  const multipart = await userInitFileUpload(filename);
  const chunkSize = 1024 * 1024 * 8; // 8MB
  const uploadId = multipart.UploadId;
  const key = multipart.Key;

  console.log("uploadId:" + uploadId);
  const numParts = Math.ceil(
    ((await FileSystem.getInfoAsync(fileUri)).size as number) / chunkSize
  );

  const promises = [];

  const signedUrls = await userGetFileUploadUrls(uploadId, key, numParts);

  for (let index = 0; index < signedUrls.length; index++) {
    const start = index * chunkSize;
    const end = (index + 1) * chunkSize;

    const blob =
      index < signedUrls.length
        ? fileData.slice(start, end)
        : fileData.slice(start);

    console.log("signedUrl: " + signedUrls[index]);

    promises.push(
      internalRequest<string>({
        url: signedUrls[index],
        method: HttpMethod.POST,
        authRequired: false,
        body: {
          blob,
        },
      })
    );
  }

  const res = await Promise.all(promises);

  console.log("storage: " + JSON.stringify(signedUrls));
  console.log("storage: " + res);

  const uploadedParts = res.map((part, index) => {
    return {
      ETag: (part as any).headers.etag as string,
      PartNumber: (index + 1) as number,
    };
  });

  const arn = await userCompleteFileUpload(uploadId, key, uploadedParts);

  return arn;
};
