// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBejsTIx7LzvmGcqXJEF1XKLx1vmw4ySU",
  authDomain: "projectauthbackend.firebaseapp.com",
  projectId: "projectauthbackend",
  storageBucket: "projectauthbackend.appspot.com",
  messagingSenderId: "943521409883",
  appId: "1:943521409883:web:db0d72188e4b479d9a487e",
};

// Initialize Firebase
export const App1 = initializeApp(firebaseConfig);
export const storage = getStorage(App1);
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const auth = firebase.auth();
// const firestore = firebase.firestore();

// export { firebase, auth, firestore };
