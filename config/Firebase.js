import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDrLcsGFz7ab0_5pqwT1FdfPg4r95C7Kx4",
    authDomain: "education-2b354.firebaseapp.com",
    databaseURL: "https://education-2b354-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "education-2b354",
    storageBucket: "education-2b354.appspot.com",
    messagingSenderId: "26992807222",
    appId: "1:26992807222:web:fa64cfb66cbcc79edf7797"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
