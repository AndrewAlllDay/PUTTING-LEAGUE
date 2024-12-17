import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import the Firebase configuration
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions

const Dashboard = () => {
    const [scorecards, setScorecards] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch scorecards from Firestore when the component mounts
    useEffect(() => {
        const fetchScorecards = async () => {
            try {
                const scoresCollection = collection(db, 'scores'); // Get the scores collection
                const scoresSnapshot = await getDocs(scoresCollection); // Fetch all documents in the collection
                const scorecardsList = scoresSnapshot.docs.map(doc => ({
                    id: doc.id, // Add the document ID to the data
                    ...doc.data(),
                }));
                setScorecards(scorecardsList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching scorecards: ", error);
                setLoading(false);
            }
        };

        fetchScorecards();
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Submitted Scores</h2>
            {loading ? (
                <p>Loading scores...</p>
            ) : (
                <div className="scorecard-list">
                    {scorecards.map((scorecard) => (
                        scorecard.scores && scorecard.scores.map((score, index) => (
                            <div key={index} className="scorecard-item">
                                <span className="player-name">{score.player}</span>
                                <span className="player-score">{score.total}</span>
                            </div>
                        ))
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
