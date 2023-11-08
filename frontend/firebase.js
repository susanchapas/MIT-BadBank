import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBfyFr7Wlv-oILerQBNSm1czXI7OZ4BhBk",
  authDomain: "oauth-test-4f04f.firebaseapp.com",
  projectId: "oauth-test-4f04f",
  storageBucket: "oauth-test-4f04f.appspot.com",
  messagingSenderId: "597569628796",
  appId: "1:597569628796:web:030e8a223d9a446ea6f7f9",
  measurementId: "G-JYQXRVZEL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// TODO: initialize provider for google auth
const provider = new GoogleAuthProvider();

console.log("app initialized...");

window.firebase = {
  createUserWithEmailAndPassword: (...args) => createUserWithEmailAndPassword(auth, ...args),
  signInWithEmailAndPassword: (...args) => signInWithEmailAndPassword(auth, ...args),
  signInWithPopup: () => signInWithPopup(auth, provider),
  logOut: () => auth.signOut(),
  deleteAccount: () => {
    //no idea if this works
    const user = auth.currentUser; 
    return user.delete()
  }
}