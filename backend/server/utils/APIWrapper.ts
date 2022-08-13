// Modified API Wrapper Inspired By Nationals NPP Portal: https://github.com/GTBitsOfGood/national-npp/blob/main/server/utils/APIWrapper.ts
import Cors, { CorsRequest } from "cors";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
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

const cors = Cors({
  methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  // Regex to determine valid cross origin requests
  origin: [
    /(localhost)./,
    "https://web-build-kappa.vercel.app",
    /samratsahoo\.vercel\.app$/,
  ],
  credentials: true,
});

const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: CorsRequest, res: any, next: any) => void
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};

function APIWrapper(
  routeHandlers: Partial<Record<HttpMethod, Route<unknown>>>
) {
  return async (req: InternalRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, cors);
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
