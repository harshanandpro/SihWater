import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDM83MHzZoviZwMyPQ5rDzjXIDF7_Zm_Yk",
  authDomain: "sihwater-e2083.firebaseapp.com",
  projectId: "sihwater-e2083",
  storageBucket: "sihwater-e2083.firebasestorage.app",
  messagingSenderId: "759093142548",
  appId: "1:759093142548:web:a9eaffcc0f818adc3e3301",
  measurementId: "G-CJ7SVBY6PF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// project-759093142548 google