// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH5wewERC7TQw94SqJJ1XHtqBGZ6JZYq4",
  authDomain: "ts-movietheaterapp.firebaseapp.com",
  projectId: "ts-movietheaterapp",
  storageBucket: "ts-movietheaterapp.appspot.com",
  messagingSenderId: "116568227070",
  appId: "1:116568227070:web:f5f5f01cba99c6862ab9af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
};

const googleSignOut = () => {
  signOut(auth);
};

export { auth, handleGoogleSignIn, googleSignOut };
