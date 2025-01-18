import { initializeApp } from "firebase/app";
import { getAuth , signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd954Yr0D3ZCdbGeV0_J2tyXg2EPwKZc4",
  authDomain: "uday9sai.firebaseapp.com",
  projectId: "uday9sai",
  storageBucket: "uday9sai.firebasestorage.app",
  messagingSenderId: "37611580339",
  appId: "1:37611580339:web:1a4445aeef56b4ef3eb9c6",
  measurementId: "G-63BMDLB52Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize auth here

// Export auth
export { auth , signOut }; // Correctly export the auth object
