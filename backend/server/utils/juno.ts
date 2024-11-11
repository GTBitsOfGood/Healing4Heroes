import juno from "juno-sdk";

juno.init({ apiKey: process.env.JUNO_API_KEY as string, baseURL: process.env.JUNO_BASE_URL as string });
const junoEmailClient = juno.email;

export {
    junoEmailClient
}
