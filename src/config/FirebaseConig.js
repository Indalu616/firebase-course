import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBHvvznN17zVolg77-CTKwUylrnT0G64jA",
  authDomain: "fir-course-42e3e.firebaseapp.com",
  projectId: "fir-course-42e3e",
  storageBucket: "fir-course-42e3e.appspot.com",
  messagingSenderId: "832733748472",
  appId: "1:832733748472:web:60e592388f9b80b73daf0d",
  measurementId: "G-GDN7KMSZDK",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage=getStorage(app)
