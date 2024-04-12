import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJ0vfULdQFYUJs07XwhbdZQVm3DXl128g",
  authDomain: "slurp-client.firebaseapp.com",
  projectId: "slurp-client",
  storageBucket: "slurp-client.appspot.com",
  messagingSenderId: "455232250572",
  appId: "1:455232250572:web:3139330c983470333a5869",
  measurementId: "G-221BGXC4LL"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);