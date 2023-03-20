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
  const serviceAccount: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };
  if (getApps().length === 0) {
    initializeApp({ credential: credential.cert(serviceAccount) });
  } else {
    getApp();
  }
}

export default dbConnect;
