import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbj3owcSFn6LM3_MlVN8SORgGlpgesyls",
  authDomain: "thaniablaq-hair.firebaseapp.com",
  projectId: "thaniablaq-hair",
  storageBucket: "thaniablaq-hair.firebasestorage.app",
  messagingSenderId: "536341852013",
  appId: "1:536341852013:web:db4d1dc108a0a785517464",
  measurementId: "G-P6PLSLM55T"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Analytics safely (it only works in the browser)
export const initAnalytics = async () => {
  if (typeof window !== "undefined" && await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export { auth };
