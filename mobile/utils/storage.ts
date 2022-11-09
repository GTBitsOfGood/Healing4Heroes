import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import { StorageLocation, HttpMethod } from "./types";
import * as FileSystem from "expo-file-system";
import {
  userInitFileUpload,
  userGetFileUploadUrls,
  userCompleteFileUpload,
  adminGetFileDownloadUrl,
} from "../actions/File";

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
  storageLocation: StorageLocation,
  fileUri: string
): Promise<string> => {
  // obtain file data from uri
  const fileData = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", fileUri, true);
    xhr.send(null);
  });

  // get upload session
  const multipart = await userInitFileUpload(storageLocation + filename);
  const chunkSize = 1024 * 1024 * 8; // 8MB
  const uploadId = multipart.UploadId;
  const key = multipart.Key;

  const numParts = Math.ceil(
    ((await FileSystem.getInfoAsync(fileUri)).size as number) / chunkSize
  );

  const promises = [];

  const signedUrls = await userGetFileUploadUrls(uploadId, key, numParts);

  // upload file in parts
  for (let index = 0; index < signedUrls.length; index++) {
    const start = index * chunkSize;
    const end = (index + 1) * chunkSize;

    const blob =
      index < signedUrls.length - 1
        ? (fileData as Uint8Array).slice(start, end)
        : (fileData as Uint8Array).slice(start);

    promises.push(
      fetch(signedUrls[index], {
        method: "PUT",
        headers: { "x-amz-storage-class": "glacier_ir" },
        body: blob,
      })
    );
  }

  const res = await Promise.all(promises);

  const uploadedParts = res.map((part, index) => {
    return {
      ETag: (part as any).headers.map.etag as string,
      PartNumber: (index + 1) as number,
    };
  });

  // trigger assemble of uploaded parts
  const fileKey = await userCompleteFileUpload(uploadId, key, uploadedParts);

  return fileKey;
};

export const getVideo = async (filename: string, storageLocation: string) => {
  const signedUrl = await adminGetFileDownloadUrl(storageLocation + filename);

  return signedUrl;
};
