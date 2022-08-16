import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as constant from "./constants";

const firebaseConfig = {
  apiKey: constant.FIREBASE_API_KEY,
  authDomain: constant.FIREBASE_AUTH_DOMAIN,
  projectId: constant.FIREBASE_PROJECT_ID,
  storageBucket: constant.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: constant.FIREBASE_MESSAGING_SENDER_ID,
  appId: constant.FIREBASE_APP_ID,
};

// Initialize Firebase
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
} else {
  getApp();
}

const auth = getAuth();

export { auth };
