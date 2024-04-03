import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDOTW6JU8gzsGeuXJ4pO4Wc4PQeUlkkBJA',
  authDomain: 'spclick-2024.firebaseapp.com',
  databaseURL: 'https://spclick-2024-default-rtdb.firebaseio.com',
  projectId: 'spclick-2024',
  storageBucket: 'spclick-2024.appspot.com',
  messagingSenderId: '1097406315373',
  appId: '1:1097406315373:web:88785146811dabb6b17864',
  measurementId: 'G-KF74M6V9Z8',
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
export const storage = getStorage(app);
// export const auth = getAuth(app);
