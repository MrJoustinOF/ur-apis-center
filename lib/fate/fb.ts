import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import {
  FB_API_KEY,
  FB_AUTH_DOMAIN,
  FB_PROJECT_ID,
  FB_STORAGE_BUCKET,
  FB_MESSAGING_SENDER,
  FB_APP_ID,
  FB_MEASUREMENT_ID,
} from "./../../config";

// const firebaseConfig = {
//   apiKey: "AIzaSyAxOQrJlBOSSbaxH9nZlUoQ1XsrU3VniWo",
//   authDomain: "fate-eea84.firebaseapp.com",
//   projectId: "fate-eea84",
//   storageBucket: "fate-eea84.appspot.com",
//   messagingSenderId: "289551926300",
//   appId: "1:289551926300:web:ee2030b289cba9c8674bd9",
//   measurementId: "G-3945LGP6LT",
// };

const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_MESSAGING_SENDER,
  appId: FB_APP_ID,
  measurementId: FB_MEASUREMENT_ID,
};

const fb = firebase.initializeApp(firebaseConfig);

export const storage = fb.storage();
