import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Import the Firebase configuration

const Dashboard = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch scores from Firestore when the component mounts
    useEffect(() => {
        const fetchScores = async () => {
            const scoresSnapshot = await db.collection('scores').get();
            const scoresList = scoresSnapshot.docs.map(doc => doc.data());
            setScores(scoresList);
            setLoading(false);
        };

        fetchScores();
    }, []);

    // Add a new score to Firestore
    const addScore = async (player, round1, round2) => {
        const total = round1 + round2;
        const newScore = { player, round1, round2, total };

        // Save score to Firestore
        await db.collection('scores').add(newScore);

        // Update local state with the new score
        setScores([...scores, newScore]);
    };

    // Remove score from Firestore
    const removeScore = async (id) => {
        await db.collection('scores').doc(id).delete();

        // Remove the score from local state
        setScores(scores.filter(score => score.id !== id));
    };

    return (
        <div>
            <h2>Today's Scores</h2>
            {loading ? (
                <p>Loading scores...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Round 1</th>
                            <th>Round 2</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((score, index) => (
                            <tr key={index}>
                                <td>{score.player}</td>
                                <td>{score.round1}</td>
                                <td>{score.round2}</td>
                                <td>{score.total}</td>
                                <td>
                                    <button onClick={() => removeScore(score.id)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <button onClick={() => addScore('John Doe', 52, 54)}>Add Score</button>
        </div>
    );
};

export default Dashboard;
