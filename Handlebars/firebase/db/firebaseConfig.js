import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCQ8d68OfS0_69E3Edw7oI9SkfEL9yIMWA",
    authDomain: "ecommerce-a5fae.firebaseapp.com",
    projectId: "ecommerce-a5fae",
    storageBucket: "ecommerce-a5fae.appspot.com",
    messagingSenderId: "211578835282",
    appId: "1:211578835282:web:4b2db1a6efbf3bbed9ea8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
