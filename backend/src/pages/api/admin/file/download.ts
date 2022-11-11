import APIWrapper from "server/utils/APIWrapper";
import { getDownloadPresignedUrl } from "server/utils/s3";
import { Role } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireToken: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const key: string = req.body.key as string;

      const signedUrl = await getDownloadPresignedUrl(key);

      if (!signedUrl || signedUrl.length === 0) {
        throw new Error("Failed to get download URL");
      }

      return signedUrl;
    },
  },
});
