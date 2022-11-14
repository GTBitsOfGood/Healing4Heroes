import { findUserById } from "server/mongodb/actions/User";
import { getLatestVerificationLog } from "server/mongodb/actions/VerificationLog";
import APIWrapper from "server/utils/APIWrapper";
import { resetPassword, verifyWebToken } from "server/utils/Authentication";
import {
  User,
  UserVerificationLogType,
  VerificationLog,
} from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireToken: false,
      requireAdminVerification: false,
    },
    handler: async (req) => {
      const newPassword: string = req.body.newPassword as string;
      const webToken: string = req.body.webToken as string;
      const decodedToken = verifyWebToken(webToken);
      if (!decodedToken?.authorized) {
        throw new Error("User Not Authorized To Reset Password");
      }
      const userId: string = decodedToken?.userId as string;
      const user: User = (await findUserById(userId)) as User;

      const lastVerificationLog: VerificationLog =
        (await getLatestVerificationLog(userId)) as VerificationLog;
      if (
        lastVerificationLog.type !== UserVerificationLogType.PASSWORD_RESET ||
        !lastVerificationLog.isVerified
      ) {
        throw new Error("You are not verified to reset your password");
      }

      const resetSuccessful = resetPassword(user.email, newPassword);

      return resetSuccessful;
    },
  },
});
