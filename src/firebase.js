import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJkSTWfB0WIJaXkO9Y0yAaW2jqi8MCVOk",
  authDomain: "smart-surveillance-for-campus.firebaseapp.com",
  projectId: "smart-surveillance-for-campus",
  storageBucket: "smart-surveillance-for-campus.appspot.com",
  messagingSenderId: "356491284928",
  appId: "1:356491284928:web:5d672fe008f9f16af33825",
  measurementId: "G-E6EYBS2LJ5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
