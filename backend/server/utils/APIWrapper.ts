// Modified API Wrapper Inspired By Nationals NPP Portal: https://github.com/GTBitsOfGood/national-npp/blob/main/server/utils/APIWrapper.ts

import mongoose from "mongoose";
import { NextApiResponse } from "next";
import {
  HttpMethod,
  InternalRequest,
  InternalResponseData,
  Role,
} from "src/utils/types";

interface RouteConfig {
  requireSession?: boolean;
  roles?: Array<Role>;
  handleResponse?: boolean; // handleResponse if the route handles setting status code and body
}

interface Route<T> {
  config?: RouteConfig;
  handler: (
    req: InternalRequest,
    res: NextApiResponse<InternalResponseData<T>>
  ) => Promise<T>;
}

function APIWrapper(
  routeHandlers: Partial<Record<HttpMethod, Route<unknown>>>
) {
  return async (req: InternalRequest, res: NextApiResponse) => {
    const method = req.method;
    const route = routeHandlers[method as HttpMethod];

    if (!method || !route) {
      const errorMessage = method
        ? `Request method ${method} is invalid.`
        : "Missing request method.";

      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    const { config, handler } = route;

    try {
      const data = await handler(req, res);

      if (config?.handleResponse) {
        return;
      }

      return res.status(200).json({ success: true, payload: data });
    } catch (e) {
      if (e instanceof mongoose.Error) {
        return res
          .status(500)
          .json({ success: false, message: "Internal Server error occurred." });
      }

      const error = e as Error;
      return res.status(400).json({ success: false, message: error.message });
    }
  };
}

export default APIWrapper;
