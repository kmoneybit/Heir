import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// These values should ideally come from .env.local
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

export { auth };
