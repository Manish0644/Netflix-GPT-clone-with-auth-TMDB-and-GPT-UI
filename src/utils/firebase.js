// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg_pXm4IWxiuxkKgT2girhIyNDaPVphUI",
  authDomain: "netflixgpt-43457.firebaseapp.com",
  projectId: "netflixgpt-43457",
  storageBucket: "netflixgpt-43457.firebasestorage.app",
  messagingSenderId: "2664238998",
  appId: "1:2664238998:web:40f21aec057dbaccd6d7b7",
  measurementId: "G-GG2N5ZD20Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

