import { NextApiRequest } from "next";

export interface User {
  email: string;
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface InternalRequest extends NextApiRequest {
  body: { [key: string]: unknown };
}

export interface InternalRequestData {
  url: string;
  method: HttpMethod;
  body?: { [key: string]: unknown };
  queryParams?: { [key: string]: string | number | boolean | undefined };
}

export interface InternalResponseData<T> {
  success: boolean;
  message?: string;
  payload?: T;
}
