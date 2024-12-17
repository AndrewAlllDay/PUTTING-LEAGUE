import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCgiPrtFvzMtCQwi0LZd3awJ40cC7ZO8OQ",
    authDomain: "putting-league-scoring.firebaseapp.com",
    projectId: "putting-league-scoring",
    storageBucket: "putting-league-scoring.firebasestorage.app",
    messagingSenderId: "133339051886",
    appId: "1:133339051886:web:8b98c9829c4d592f80b37f",
    measurementId: "G-LGDBG2MSWT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
