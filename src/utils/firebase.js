// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAorQ6ecq5xNjiBUi4sMV6Umiv1FdaGncU",
  authDomain: "netflixgpt-b31e6.firebaseapp.com",
  projectId: "netflixgpt-b31e6",
  storageBucket: "netflixgpt-b31e6.firebasestorage.app",
  messagingSenderId: "205692093505",
  appId: "1:205692093505:web:cd7f2a07f9aa8c0708f2c0",
  measurementId: "G-EXVNST1K9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();