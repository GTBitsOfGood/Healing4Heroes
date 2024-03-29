import path from "path";
import Email from "email-templates";
import { getAuth } from "firebase-admin/auth";
import jwt from "jsonwebtoken";
import nodemailer, { TransportOptions } from "nodemailer";
import UserModel from "server/mongodb/models/User";
import dbConnect, { firebaseConnect } from "./dbConnect";

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

// export const sendEmail = async (
//   recipient: string,
//   emailSubject: string,
//   emailBody: string
// ) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_SERVER_HOST,
//     port: process.env.EMAIL_SERVER_PORT,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL_SERVER_USER,
//       pass: process.env.EMAIL_SERVER_PASSWORD,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   } as TransportOptions);

//   const res = await transporter.sendMail({
//     from: process.env.EMAIL_FROM,
//     to: recipient,
//     subject: emailSubject,
//     html: emailBody,
//   } as Mail.Options);
//   return res;
// };

export const sendEmail = async (
  recipient: string,
  emailSubject: string,
  template: string,
  key?: { [Key: string]: string }
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  } as TransportOptions);
  const email = new Email({
    message: {
      from: process.env.EMAIL_FROM,
    },
    preview:
      process.env.NODE_ENV === "development" ? { openSimulator: false } : false,
    transport: transporter,
  });
  await email.send({
    template: path.join(process.cwd(), `/server/utils/emails/`, template),
    message: {
      to: recipient,
      subject: emailSubject,
    },
    locals: key,
  });
};

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
