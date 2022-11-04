import { Types } from "mongoose";
import {
  createVerificationLog,
  getLatestVerificationLog,
  updateVerificationLog,
} from "server/mongodb/actions/VerificationLog";
import APIWrapper from "server/utils/APIWrapper";
import { sendEmail } from "server/utils/Authentication";
import {
  VERIFICATION_EMAIL_BODY,
  VERIFICATION_EMAIL_SUBJECT,
} from "src/utils/constants";
import { UserVerificationLogType, VerificationLog } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireToken: false,
    },
    handler: async (req) => {
      const userId: Types.ObjectId = req.body.userId as Types.ObjectId;
      const type: UserVerificationLogType = req.body
        .type as UserVerificationLogType;

      const verificationLog = await createVerificationLog(userId, type);

      if (!verificationLog) {
        throw new Error("Failed to create verification log");
      }

      await sendEmail(
        verificationLog.email,
        VERIFICATION_EMAIL_SUBJECT,
        VERIFICATION_EMAIL_BODY(verificationLog.code)
      );

      return verificationLog.expirationDate;
    },
  },
  PATCH: {
    config: {
      requireToken: false,
    },
    handler: async (req) => {
      const userId: Types.ObjectId = req.body.userId as Types.ObjectId;
      const code = Number(req.body.code);

      const latestLog: VerificationLog = (await getLatestVerificationLog(
        userId
      )) as VerificationLog;

      if (!latestLog) {
        throw new Error("User does not have any verification logs");
      } else if (
        latestLog.isVerified ||
        latestLog.expired ||
        new Date() > latestLog.expirationDate
      ) {
        await updateVerificationLog(latestLog._id, undefined, true);
        throw new Error("Verification request has expired");
      } else if (code !== latestLog.code) {
        throw new Error("Incorrect code");
      }

      await updateVerificationLog(latestLog._id, true, true);

      return {
        userId,
        authorized: true,
      };
    },
  },
});
