import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getFirestore  } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MENSUREMENT_ID
// };
const firebaseConfig = {
  apiKey: "AIzaSyAr_CERUQ5mMUbpHwT9BxKm0MgO7xX6iH8",
  authDomain: "awenotes-jn.firebaseapp.com",
  databaseURL: "https://awenotes-jn-default-rtdb.firebaseio.com",
  projectId: "awenotes-jn",
  storageBucket: "awenotes-jn.appspot.com",
  messagingSenderId: "821219003412",
  appId: "1:821219003412:web:e27040b705c52c08d02b01",
  measurementId: "G-GMDD8S91PC"
};

initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = getFirestore();

export { auth, firestore };