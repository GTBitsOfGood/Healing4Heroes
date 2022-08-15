import { credential } from "firebase-admin";
import {
  initializeApp,
  getApps,
  getApp,
  ServiceAccount,
} from "firebase-admin/app";
import mongoose from "mongoose";

async function dbConnect(): Promise<void> {
  if (mongoose.connections[0].readyState) return;

  await mongoose
    .connect(process.env.DATABASE_URL as string, {
      socketTimeoutMS: 360000,
      dbName: process.env.DATABASE_NAME,
    })
    .catch((error) => {
      console.error("Unable to connect to database.");

      throw error;
    });
}

export function firebaseConnect() {
  /*eslint-disable */
  const serviceAccount: ServiceAccount =
    require("./firebase-service-account.json") as ServiceAccount;
  /*eslint-enable */
  if (getApps().length === 0) {
    initializeApp({ credential: credential.cert(serviceAccount) });
  } else {
    getApp();
  }
}

export default dbConnect;
