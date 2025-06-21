// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqwxHXfizVxk91d7dlL99JEtrTkxGHEV8",
  authDomain: "business-23546.firebaseapp.com",
  projectId: "business-23546",
  storageBucket: "business-23546.appspot.com", // Fixed the storage bucket name
  messagingSenderId: "874038631285",
  appId: "1:874038631285:web:71f7096977465139ac913c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Security Rules Tip: Set these in Firebase Console:
// - Firestore: Allow read/write only if authenticated
// - Storage: Similar restrictions