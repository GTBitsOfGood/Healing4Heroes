import APIWrapper from "server/utils/APIWrapper";
import { parseEmailTemplate, sendEmail } from "server/utils/Authentication";
import { EmailSubject, EmailType } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireToken: false,
      requireAdminVerification: false,
    },
    handler: async () => {
      const emailBody = parseEmailTemplate(EmailType.EMAIL_VERIFICATION, {
        VERIFICATION_CODE: "1 2 3 4 5 6",
      });
      await sendEmail(
        "samratsahoo2013@gmail.com",
        EmailSubject.EMAIL_VERIFICATION,
        emailBody
      );
      return {
        Hello: "World",
        Version: 2.0,
      };
    },
  },
});
