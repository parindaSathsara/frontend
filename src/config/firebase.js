// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMVyiWjeJmHdppof5PwBWIYYOgIak8bVE",
  authDomain: "shwomens-60359.firebaseapp.com",
  projectId: "shwomens-60359",
  storageBucket: "shwomens-60359.firebasestorage.app",
  messagingSenderId: "227234684238",
  appId: "1:227234684238:web:f29602ea89250db256521f",
  measurementId: "G-7TF8KQVQ8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { app, analytics, auth, googleProvider };
