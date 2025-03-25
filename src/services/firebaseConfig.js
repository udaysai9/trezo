import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGp2wgf81BINwYym6q5fRNDS_gLIcl0W4",
  authDomain: "trezo0.firebaseapp.com",
  projectId: "trezo0",
  storageBucket: "trezo0.appspot.com",
  messagingSenderId: "966520233112",
  appId: "1:966520233112:web:b9c6f93945acdc613c44ed",
  measurementId: "G-KMLLHPJW07"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };
