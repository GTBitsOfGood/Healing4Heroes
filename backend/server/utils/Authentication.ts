import path from "path";
import Email from "email-templates";
import { getAuth } from "firebase-admin/auth";
import jwt from "jsonwebtoken";
import nodemailer, { TransportOptions } from "nodemailer";
import pug from "pug";
import UserModel from "server/mongodb/models/User";
import dbConnect, { firebaseConnect } from "./dbConnect";
import { junoEmailClient } from "./juno";

export const getUser = async (accessToken: string) => {
  if (!accessToken) {
    throw new Error("This API endpoint requires an access token!");
  }
  firebaseConnect();
  const decodedToken = await getAuth().verifyIdToken(accessToken);
  if (!decodedToken || !decodedToken.uid) {
    throw new Error("Invalid access token!");
  }

  await dbConnect();
  const user = await UserModel.findOne({
    firebaseUid: decodedToken.uid,
  });

  if (!user) {
    throw new Error("Could not find user in database!");
  }
  return user;
};

export const getWebToken = (data: Record<string, string | boolean>) => {
  data.authorized = true;
  return jwt.sign(data, process.env.APP_SECRET as string, {
    expiresIn: "1h",
  });
};

export const verifyWebToken = (webToken: string) => {
  const data = jwt.verify(webToken, process.env.APP_SECRET as string, {
    ignoreExpiration: false,
  });
  return data as Record<string, string | boolean>;
};

export async function sendEmail(
  recipient: string,
  emailSubject: string,
  template: string,
  key?: { [Key: string]: string }
): Promise<void> {
  const compiledTemplate = pug.compileFile(
    path.join(process.cwd(), `/server/utils/emails/`, template, "/html.pug")
  );
  await junoEmailClient.sendEmail({
    subject: emailSubject,
    bcc: [],
    cc: [],
    sender: {
      email: process.env.JUNO_SENDER_EMAIL as string,
      name: process.env.JUNO_SENDER_NAME as string,
    },
    recipients: [{ email: recipient, name: recipient }],
    contents: [
      {
        type: "text/html",
        value: compiledTemplate(key),
      },
    ],
  });
}

export const resetPassword = async (email: string, newPassword: string) => {
  firebaseConnect();
  const user = await getAuth().getUserByEmail(email);
  const update = await getAuth().updateUser(user.uid, {
    password: newPassword,
  });
  return update;
};

export const verifyUserEmailFirebase = async (firebaseUid: string) => {
  firebaseConnect();
  await getAuth().updateUser(firebaseUid, {
    emailVerified: true,
  });
};

export const removeUserFromFirebase = async (firebaseUid: string) => {
  firebaseConnect();
  await getAuth().deleteUser(firebaseUid);
};
