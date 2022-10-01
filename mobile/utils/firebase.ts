import { getApps, getApp, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
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

let app;
// Initialize Firebase
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth();
const storage = getStorage(app);

export { auth, storage };
