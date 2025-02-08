import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChR0vEORIMcBlC6Lgs3gDbQuGZ8mpPn40",
  authDomain: "hello-796a2.firebaseapp.com",
  projectId: "hello-796a2",
  storageBucket: "hello-796a2.firebasestorage.app",
  messagingSenderId: "443706802352",
  appId: "1:443706802352:web:fc577700800e3215f7bb75",
  measurementId: "G-BJJ6G6ETW1"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
