import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import the Firebase configuration
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import './Dashboard.css'; // Import the CSS for styling

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

                // Flatten the scorecards' scores and sort them globally by total score
                let allScores = [];

                scorecardsList.forEach(scorecard => {
                    if (scorecard.scores) {
                        scorecard.scores.forEach(score => {
                            if (score && score.player && score.total !== undefined) {
                                allScores.push(score); // Add each player's score to the allScores array
                            }
                        });
                    }
                });

                // Sort all scores by total score in descending order
                const sortedScores = allScores.sort((a, b) => b.total - a.total);

                // Update state with the sorted scores
                setScorecards(sortedScores);
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
                <p className="loading">Loading scores...</p>
            ) : (
                <div className="scorecard-list">
                    {scorecards.map((score, index) => (
                        <div className="scorecard-item" key={index}>
                            <span className="player-name">{score.player}</span>
                            <span className="player-score">{score.total}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
