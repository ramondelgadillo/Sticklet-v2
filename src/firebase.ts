// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB67nVog44UI6AmwyuWZ40DaaXL3LnsBPg",
  authDomain: "stickletapp-3beec.firebaseapp.com",
  projectId: "stickletapp-3beec",
  storageBucket: "stickletapp-3beec.firebasestorage.app",
  messagingSenderId: "936335731753",
  appId: "1:936335731753:web:94a98a8fd4412dd6508038",
  measurementId: "G-9W4N07QLR1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
