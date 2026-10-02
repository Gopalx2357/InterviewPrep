import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDMnHdEXz6PARWqETWlRIrw2EQ6OuJh14",
  authDomain: "interview-c1839.firebaseapp.com",
  projectId: "interview-c1839",
  storageBucket: "interview-c1839.firebasestorage.app",
  messagingSenderId: "609804777093",
  appId: "1:609804777093:web:4381d96a76b8d07b129bec",
  measurementId: "G-JGQKCX8K0Y"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

export let analytics: any = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => console.log("Firebase Analytics not supported:", err));
}

export { app, firebaseConfig };
