import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// TODO: Replace this with your Firebase Project Configuration
// 1. Go to console.firebase.google.com
// 2. Create a new project
// 3. Click the Web icon (</>) to add an app
// 4. Copy the config object below
const firebaseConfig = {
  apiKey: "AIzaSyD48ZZ8utJIB1s0IWHH5mlO6Nj7RWh6k_Q",
  authDomain: "ezycart-f3663.firebaseapp.com",
  projectId: "ezycart-f3663",
  storageBucket: "ezycart-f3663.firebasestorage.app",
  messagingSenderId: "60410858245",
  appId: "1:60410858245:web:e0ca4a3b7ce19b695a456c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
  auth, db, 
  onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,
  collection, doc, setDoc, getDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc
};
