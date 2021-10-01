// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCWPS22VpGj8V-o0qYIrroN0ZSdXaaNtw",
  authDomain: "mini-project-ecofriends.firebaseapp.com",
  projectId: "mini-project-ecofriends",
  storageBucket: "mini-project-ecofriends.appspot.com",
  messagingSenderId: "106123013645",
  appId: "1:106123013645:web:447a38c8ea45801d502f44",
  measurementId: "G-PLRC53PWN0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const analytics = getAnalytics(app);

export { auth }