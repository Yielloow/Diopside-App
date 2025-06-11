// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyBp1gzOZ3OfMceEmyHoBzXwHT5X5JQNqeY",
  authDomain: "diopside-app.firebaseapp.com",
  projectId: "diopside-app",
  storageBucket: "diopside-app.firebasestorage.app",
  messagingSenderId: "911552827939",
  appId: "1:911552827939:android:861d50f67f7d9dd06cd796"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
