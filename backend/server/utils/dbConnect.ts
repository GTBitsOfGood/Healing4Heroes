import {
  applicationDefault,
  initializeApp,
  getApps,
  getApp,
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
  process.env.GOOGLE_APPLICATION_CREDENTIALS = "firebase-service-account.json";
  if (getApps().length === 0) {
    initializeApp({ credential: applicationDefault() });
  } else {
    getApp();
  }
}

export default dbConnect;
