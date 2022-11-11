import APIWrapper from "server/utils/APIWrapper";
import { initMultipartUpload } from "server/utils/s3";
import { Role } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const filename: string = req.body.filename as string;

      const multipartUpload = await initMultipartUpload(filename);

      return multipartUpload;
    },
  },
});
