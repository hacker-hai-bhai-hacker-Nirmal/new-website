import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: "litterateur-e0a3c.firebaseapp.com",
  projectId: "litterateur-e0a3c",
  storageBucket: "litterateur-e0a3c.firebasestorage.app",
  messagingSenderId: "720445027014",
  appId: "1:720445027014:web:bf1d60c9a2a3f93c675dc7",
  measurementId: "G-JM0F9W1H40"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
