import APIWrapper from "server/utils/APIWrapper";
import { completeMultipartUpload } from "server/utils/s3";
import { Role, UploadedPart } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const uploadId: string = req.body.uploadId as string;
      const key: string = req.body.key as string;
      const parts: UploadedPart[] = req.body.parts as UploadedPart[];

      const arn = await completeMultipartUpload(uploadId, key, parts);

      if (!arn) {
        throw new Error("Failed to complete upload");
      }

      return arn;
    },
  },
});
