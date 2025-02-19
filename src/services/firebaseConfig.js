import { initializeApp } from "firebase/app";
import { getAuth , signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGp2wgf81BINwYym6q5fRNDS_gLIcl0W4",
  authDomain: "trezo0.firebaseapp.com",
  projectId: "trezo0",
  storageBucket: "trezo0.firebasestorage.app",
  messagingSenderId: "966520233112",
  appId: "1:966520233112:web:b9c6f93945acdc613c44ed",
  measurementId: "G-KMLLHPJW07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize auth here

// Export auth
export { auth , signOut }; // Correctly export the auth object
