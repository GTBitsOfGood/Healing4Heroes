import APIWrapper from "server/utils/APIWrapper";
import { sendEmail } from "server/utils/Authentication";
import { Role } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireToken: false,
      requireAdminVerification: false,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const recipient: string = req.body.recipient as string;
      const emailSubject: string = req.body.emailSubject as string;
      const emailTemplate: string = req.body.emailTemplate as string;
      const emailData: { [Key: string]: string } = req.body.emailData as {
        [Key: string]: string;
      };
      await sendEmail(recipient, emailSubject, emailTemplate, emailData);
      return true;
    },
  },
});
