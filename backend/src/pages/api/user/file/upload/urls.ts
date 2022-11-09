import APIWrapper from "server/utils/APIWrapper";
import { getMultipartUploadPresignedUrls } from "server/utils/s3";
import { Role } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const uploadId: string = req.body.uploadId as string;
      const key: string = req.body.key as string;
      const parts: number = req.body.parts as number;

      const signedUrls = await getMultipartUploadPresignedUrls(
        uploadId,
        key,
        parts
      );

      if (!signedUrls || signedUrls.length === 0) {
        throw new Error("Failed to create signed URLs");
      }

      return signedUrls;
    },
  },
});
