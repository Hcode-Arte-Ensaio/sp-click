import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/firestore";
// import {...} from "firebase/database";
// import {...} from "firebase/functions";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDOTW6JU8gzsGeuXJ4pO4Wc4PQeUlkkBJA",
  authDomain: "spclick-2024.firebaseapp.com",
  databaseURL: "https://spclick-2024-default-rtdb.firebaseio.com",
  projectId: "spclick-2024",
  storageBucket: "spclick-2024.appspot.com",
  messagingSenderId: "1097406315373",
  appId: "1:1097406315373:web:88785146811dabb6b17864",
  measurementId: "G-KF74M6V9Z8",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
export const database = getFirestore(app);
export const storage = getStorage(app);
