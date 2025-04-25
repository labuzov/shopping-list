import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// public keys, .env is not needed
const firebaseConfigs: { [mode: string]: {} } = {
    'development': {
        apiKey: 'AIzaSyDcgxvj2oRuTs_AtEHu9nJMd_vFWp5yhew',
        authDomain: 'shopping-list-qa.firebaseapp.com',
        projectId: 'shopping-list-qa',
        storageBucket: 'shopping-list-qa.firebasestorage.app',
        messagingSenderId: '1041901908153',
        appId: '1:1041901908153:web:350f5600a6d51af8deeb68',
        measurementId: 'G-R3N2SKRZC5'
    },
    'production': {
        apiKey: 'AIzaSyA3aPnzkGje7SSk4AP6-wKqblPunlrFIJk',
        authDomain: 'shopping-list-b1c7a.firebaseapp.com',
        projectId: 'shopping-list-b1c7a',
        storageBucket: 'shopping-list-b1c7a.appspot.com',
        messagingSenderId: '717837827050',
        appId: '1:717837827050:web:067d2857f7ae7683b89093',
        measurementId: 'G-11PZENQ5L3'
    },
}

const firebaseConfig = firebaseConfigs[import.meta.env.MODE];

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
