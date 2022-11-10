import { Types } from "mongoose";
import { findUserByEmail } from "server/mongodb/actions/User";
import {
  createVerificationLog,
  getLatestVerificationLog,
  updateVerificationLog,
} from "server/mongodb/actions/VerificationLog";
import APIWrapper from "server/utils/APIWrapper";
import {
  getWebToken,
  parseEmailTemplate,
  sendEmail,
} from "server/utils/Authentication";
import { EMAIL_VERIFICATION_TEMPLATE } from "server/utils/emails/EmailVerification";
import { PASSWORD_RESET_TEMPLATE } from "server/utils/emails/PasswordReset";
import {
  EmailSubject,
  User,
  UserVerificationLogType,
  VerificationLog,
} from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireToken: false,
    },
    handler: async (req) => {
      const email: string = req.body.email as string;
      const type: UserVerificationLogType = req.body
        .type as UserVerificationLogType;

      const user: User = (await findUserByEmail(email)) as User;

      if (!user) {
        throw new Error(`Could not find user with email: ${email}`);
      }
      const verificationLog = await createVerificationLog(user._id, type);

      if (!verificationLog) {
        throw new Error("Failed to create verification log");
      }

      let emailSubject;
      let emailTemplate;
      switch (type) {
        case UserVerificationLogType.EMAIL_VERIFICATION:
          emailSubject = EmailSubject.EMAIL_VERIFICATION;
          emailTemplate = EMAIL_VERIFICATION_TEMPLATE;
          break;
        case UserVerificationLogType.PASSWORD_RESET:
          emailSubject = EmailSubject.PASSWORD_RESET;
          emailTemplate = PASSWORD_RESET_TEMPLATE;
          break;
      }

      if (emailSubject && emailTemplate) {
        const emailBody = parseEmailTemplate(emailTemplate, {
          VERIFICATION_CODE: verificationLog.code
            .toString()
            .split("")
            .join(" "),
        });
        await sendEmail("samratsahoo2013@gmail.com", emailSubject, emailBody);
      }

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
      const webToken = getWebToken({
        userId: userId.toString(),
        authorized: true,
      });
      return {
        webToken,
      };
    },
  },
});
