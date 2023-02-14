import { findUserByEmail, verifyUserEmail } from "server/mongodb/actions/User";
import {
  createVerificationLog,
  getLatestVerificationLog,
  updateVerificationLog,
} from "server/mongodb/actions/VerificationLog";
import APIWrapper from "server/utils/APIWrapper";
import {
  getWebToken,
  sendEmail,
  verifyUserEmailFirebase,
} from "server/utils/Authentication";
import {
  EmailSubject,
  EmailTemplate,
  User,
  UserVerificationLogType,
  VerificationLog,
} from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireToken: false,
      requireAdminVerification: false,
      requireEmailVerified: false,
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
          emailTemplate = EmailTemplate.EMAIL_VERIFICATION;
          break;
        case UserVerificationLogType.PASSWORD_RESET:
          emailSubject = EmailSubject.PASSWORD_RESET;
          emailTemplate = EmailTemplate.PASSWORD_RESET;
          break;
      }
      const emailLocals = {
        VERIFICATION_CODE: verificationLog.code.toString().split("").join(" "),
      };
      if (emailSubject && emailTemplate) {
        await sendEmail(email, emailSubject, emailTemplate, emailLocals);
      }

      return verificationLog.expirationDate;
    },
  },
  PATCH: {
    config: {
      requireToken: false,
      requireAdminVerification: false,
      requireEmailVerified: false,
    },
    handler: async (req) => {
      const email: string = req.body.email as string;
      const code = Number(req.body.code);

      const user: User = (await findUserByEmail(email)) as User;

      if (!user) {
        throw new Error("User Does Not Exist!");
      }

      const latestLog: VerificationLog = (await getLatestVerificationLog(
        user._id
      )) as VerificationLog;

      if (!latestLog) {
        throw new Error("User does not have any verification logs");
      } else if (
        latestLog.isVerified ||
        latestLog.expired ||
        new Date() > latestLog.expirationDate
      ) {
        await updateVerificationLog(latestLog._id, undefined, true, undefined);
        throw new Error("Verification request has expired");
      } else if (code !== latestLog.code) {
        const isFinalAttempt = latestLog.attempts >= 10;

        await updateVerificationLog(
          latestLog._id,
          undefined,
          isFinalAttempt ? true : undefined,
          latestLog.attempts + 1
        );

        if (isFinalAttempt) {
          await createVerificationLog(user._id, latestLog.type);
          throw new Error(
            "Too many incorrect attempts, a new code has been sent to your email."
          );
        }

        throw new Error("Incorrect verification code");
      }

      await updateVerificationLog(
        latestLog._id,
        true,
        true,
        latestLog.attempts + 1
      );

      if (latestLog.type === UserVerificationLogType.EMAIL_VERIFICATION) {
        await Promise.all([
          verifyUserEmail(user._id),
          verifyUserEmailFirebase(user.firebaseUid),
        ]);
      }

      const webToken = getWebToken({
        userId: user._id.toString(),
        authorized: true,
      });
      return {
        webToken,
      };
    },
  },
});
