import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey:process.env.REACT_APP_FIREBASE_API_KEY ,
    authDomain: "authentication-57a28.firebaseapp.com",
    projectId: "authentication-57a28",
    storageBucket: "authentication-57a28.firebasestorage.app",
    messagingSenderId: "1052372365852",
    appId: "1:1052372365852:web:84b77f6b9bd8ba2d3a25d9",
    measurementId: "G-JYJT15JWQR"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
