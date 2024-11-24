import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyA3aPnzkGje7SSk4AP6-wKqblPunlrFIJk",
    authDomain: "shopping-list-b1c7a.firebaseapp.com",
    databaseURL: "https://shopping-list-b1c7a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shopping-list-b1c7a",
    storageBucket: "shopping-list-b1c7a.appspot.com",
    messagingSenderId: "717837827050",
    appId: "1:717837827050:web:067d2857f7ae7683b89093",
    measurementId: "G-11PZENQ5L3"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(firebaseApp);
export const firebaseFirestore = getFirestore(firebaseApp);
