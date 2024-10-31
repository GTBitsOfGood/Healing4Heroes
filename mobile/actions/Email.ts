import { internalRequest } from "../utils/requests";
import { HttpMethod, EmailBody } from "../utils/types";
import { urls } from "../utils/urls";

const userEmailUrl = urls.baseUrl + urls.api.user.email;

export const userSendEmail = async (
    recipient: string,
    emailSubject: string,
    emailTemplate: string,
    emailData: { [Key: string]: string }
) => {
    await internalRequest<EmailBody>({
        url: userEmailUrl,
        method: HttpMethod.POST,
        authRequired: true,
        body: {
            recipient,
            emailSubject,
            emailTemplate,
            emailData,
        }
    }).then().catch((error) => {
        console.error(error);
    });
};