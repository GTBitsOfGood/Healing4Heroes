import APIWrapper from "server/utils/APIWrapper";
import { Role } from "src/utils/types";
import { sendEmail } from "server/utils/Authentication";

export default APIWrapper({
    POST: {
        config: {
            requireToken: false,
            requireAdminVerification: false,
            roles: [Role.NONPROFIT_USER],
        },
        handler: async (req) => {
            console.log("email handler called");
            const recipient: string = req.body.recipient as string;
            const emailSubject: string = req.body.emailSubject as string;
            const emailTemplate: string = req.body.emailTemplate as string;
            const emailData: { [Key: string]: string } = req.body.emailData as { [Key: string]: string };
            console.log(recipient, emailSubject, emailTemplate, emailData);

            const res = await sendEmail(recipient, emailSubject, emailTemplate, emailData);
            return res;
        }
    }
});