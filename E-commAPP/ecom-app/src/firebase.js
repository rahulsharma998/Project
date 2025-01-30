import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA2lNiySvndvjeNuuFkqXjI9xniOrFetY0",
  authDomain: "e-com-app-5.firebaseapp.com",
  projectId: "e-com-app-5",
  storageBucket: "e-com-app-5.firebasestorage.app",
  messagingSenderId: "886897764326",
  appId: "1:886897764326:web:bf4711b73cbe8297add827",
  measurementId: "G-S2XS1GQ08N"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { firebaseApp, auth };