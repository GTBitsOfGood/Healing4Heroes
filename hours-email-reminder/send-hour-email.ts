import juno from "juno-sdk";
import mongoose from "mongoose";
import { EmailContent, EmailRecipient } from "juno-sdk/internal/api";
import { Types } from "mongoose";
import { User } from "./types";
import { AnimalModel, UserModel } from "./models";
import pug from "pug";
import path from "path";


const DATABASE_URL = process.env.DATABASE_URL as string;
const DATABASE_NAME = process.env.DATABASE_NAME as string;
const JUNO_API_KEY = process.env.JUNO_API_KEY as string;
const JUNO_BASE_URL = process.env.JUNO_BASE_URL as string
const JUNO_SENDER_EMAIL = process.env.JUNO_SENDER_EMAIL as string;
const JUNO_SENDER_NAME = process.env.JUNO_SENDER_NAME as string;

const PAGE_SIZE = 1000;

juno.init({
    apiKey: JUNO_API_KEY as string,
    baseURL: JUNO_BASE_URL as string
})

async function dbConnect(): Promise<void> {
    if (mongoose.connections[0].readyState) return;

    await mongoose
        .connect(DATABASE_URL as string, {
            socketTimeoutMS: 360000,
            dbName: DATABASE_NAME,
        })
        .catch((error) => {
            console.error("Unable to connect to database.");

            throw error;
        });
}

export async function sendEmail({ bccRecipients, content, subject }:
    { subject: string, content: EmailContent[], bccRecipients?: EmailRecipient[], recipients?: EmailRecipient[], ccRecipients?: EmailRecipient[], }) {
    const BATCH_SIZE = 1000;

    try {
        for (let i = 0; i < (bccRecipients as EmailRecipient[]).length; i += BATCH_SIZE) {
            const limitedBcc = (bccRecipients as EmailRecipient[]).slice(i, i + BATCH_SIZE);
            await juno.email.sendEmail({
                recipients: [{ email: "gt.engineering@hack4impact.org", name: "Bits of Good Engineering" }],
                bcc: limitedBcc ?? [],
                cc: [],
                sender: {
                    email: JUNO_SENDER_EMAIL as string,
                    name: JUNO_SENDER_NAME as string
                },
                subject: subject,
                contents: content
            })

        }
    } catch (e) {
        console.log(e)
    }
}


export async function sendHourReminderEmail() {
    if (!DATABASE_URL || !DATABASE_NAME || !JUNO_API_KEY || !JUNO_SENDER_EMAIL || !JUNO_SENDER_NAME || !JUNO_BASE_URL)
        return 0

    const usersList = await getUsersWithout800Hours(PAGE_SIZE);
    const junoRecipients: EmailRecipient[] = usersList.map((user: User) => {
        return {
            email: user.email,
            name: user.firstName
        }
    })
    await sendEmail({ bccRecipients: junoRecipients, subject: "Reminder: Camp Grace - 800 Hours Requirement", content: [{ type: "text/html", value: generateEmailContent() }] })
    return usersList.length
}


async function getUsersPaginated(
    pageSize: number,
    afterId?: Types.ObjectId,
) {
    await dbConnect();

    let query: any;

    const handlers = await AnimalModel.find({
        totalHours: { $gte: 800 },
    }).select("handler");

    query = {
        _id: {
            ...(afterId && { $gt: afterId }),
            $nin: handlers.map((item) => item.handler),
        },
        verifiedByAdmin: true,
        unsubscribeEmail: false
    };

    const users = await UserModel.find(query, null, { sort: { _id: 1 } }).limit(
        pageSize
    );

    return users;
}

export async function getUsersWithout800Hours(pageSize) {
    let usersList: User[] = [];
    let afterId: undefined | Types.ObjectId = undefined;

    try {
        while (true) {
            const users = await getUsersPaginated(
                pageSize,
                afterId);

            usersList = [...usersList, ...users];

            if (users.length < pageSize) break;

            afterId = users[users.length - 1]._id;
        }
    } catch (error) {
        console.error("Error fetching users:", error);
    }
    return usersList;
}


const generateEmailContent = () => {
    const compiledTemplate = pug.compileFile(
        path.join(process.cwd(), "/email.pug")
    );

    return compiledTemplate({})
}

sendHourReminderEmail()
    .then((totalUsers) => {
        if (totalUsers) {
            console.log(`\nScript completed. Emails sent to ${totalUsers} users.`);
        } else {
            console.log(`\nScript completed. No emails sent due to incomplete configuration or no users in database.`);
        }
        process.exit(0);
    })
    .catch((error) => {
        console.error("An error occurred:", error);
        process.exit(1);
    });