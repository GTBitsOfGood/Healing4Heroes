import { InternalRequestData, InternalResponseData } from "./types";
import { auth } from "../utils/firebase";

export async function internalRequest<T>({
  url,
  queryParams,
  method,
  body,
  requireAuth,
}: InternalRequestData): Promise<T> {
  const requestInfo: RequestInit = {
    method,
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      accessToken: requireAuth
        ? ((await auth.currentUser?.getIdToken()) as string)
        : "",
    },
  };

  if (body) {
    requestInfo.body = JSON.stringify(body);
  }
  if (queryParams) {
    Object.entries(queryParams)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => {
        url = `${url}?${key}=${(
          value as string | number | boolean
        ).toString()}&`;
      });
  }
  const response = await fetch(url, requestInfo);
  const responseBody = (await response.json()) as InternalResponseData<T>;

  if (!responseBody) {
    throw new Error("Unable to connect to API.");
  } else if (!responseBody.success) {
    const errorMessage = responseBody.message;
    throw new Error(errorMessage);
  }

  return responseBody.payload as T;
}
