import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7x7gb6vl88tJDbttTF6vYmjKXu3kv_Zw",
  authDomain: "quickscan-alpha-v1.firebaseapp.com",
  projectId: "quickscan-alpha-v1",
  storageBucket: "quickscan-alpha-v1.appspot.com",
  messagingSenderId: "117587023341",
  appId: "1:117587023341:web:e172f3f2bb5861b4e5c3e4"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);