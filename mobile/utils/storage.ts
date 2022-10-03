import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import { StorageLocation } from "./types";

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

export const getFile = (fileFullPath: string): Promise<string> => {
  return getDownloadURL(ref(storage, fileFullPath));
};
