import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"
import { getAuth } from 'firebase/auth';
import { getFirestore  } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MENSUREMENT_ID
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

const app = initializeApp(firebaseConfig);

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});

const auth = getAuth();
const firestore = getFirestore();

export { auth, firestore };