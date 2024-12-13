import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

export const saveScorecardToFirestore = async (players, rounds) => {
    try {
        await addDoc(collection(db, 'scorecards'), {
            players,
            rounds,
            createdAt: new Date(),
        });
        console.log('Scorecard saved!');
    } catch (error) {
        console.error('Error saving scorecard:', error);
    }
};

export { db };
