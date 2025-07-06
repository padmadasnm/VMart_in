import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpkCGytrONKbaqMXAnVRxnkcC2BF2avbc",
  authDomain: "login-auth-e5b7a.firebaseapp.com",
  projectId: "login-auth-e5b7a",
  storageBucket: "login-auth-e5b7a.firebasestorage.app",
  messagingSenderId: "767795866292",
  appId: "1:767795866292:web:3bbbe9e7f20bcaea9445e1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
