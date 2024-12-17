import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import the Firebase configuration
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import "./Dashboard.css"; // Import the CSS for styling

const Dashboard = () => {
  const [scorecards, setScorecards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch scorecards from Firestore when the component mounts
  useEffect(() => {
    const fetchScorecards = async () => {
      try {
        const scoresCollection = collection(db, "scores"); // Correct collection name is 'scores'
        const scoresSnapshot = await getDocs(scoresCollection); // Fetch all documents in the collection
        const scorecardsList = scoresSnapshot.docs.map((doc) => ({
          id: doc.id, // Add the document ID to the data
          ...doc.data(),
        }));

        // Log the raw data from Firestore to inspect it
        console.log("Scorecards List:", scorecardsList);

        // Flatten the scorecards' scores and compute totals
        const formattedScores = scorecardsList.map((scorecard) => {
          const { gameDate, scores } = scorecard;
          console.log("Processing scorecard:", scorecard); // Log the current scorecard

          const totalScores = scores.map((score) => {
            console.log("Processing score:", score); // Log each score object

            // Directly use score.scores if it's a single value
            const total = parseInt(score.scores); // Directly parse the number

            console.log(`Total for ${score.player}: ${total}`); // Log total score for the player

            return {
              player: score.player,
              division: score.division,
              total,
            };
          });
          return {
            gameDate: gameDate,
            scores: totalScores,
          };
        });

        // Log the formatted scores to check the structure
        console.log("Formatted Scores:", formattedScores);

        // Flatten the scores for all scorecards
        let allScores = [];
        formattedScores.forEach((scorecard) => {
          allScores = allScores.concat(scorecard.scores);
        });

        // Log the flattened scores to ensure correct data
        console.log("All Scores:", allScores);

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
  }, []); // Run once when the component mounts

  return (
    <div className="dashboard-container">
      <h2>Submitted Scores</h2>
      {loading ? (
        <p className="loading">Loading scores...</p>
      ) : (
        <div className="scorecard-list">
          {scorecards.length === 0 ? (
            <p>No scores submitted yet.</p>
          ) : (
            scorecards.map((score, index) => (
              <div className="scorecard-item" key={index}>
                <span className="player-name">{score.player}</span>
                <span className="player-division">{score.division}</span> {/* Display division */}
                <span className="player-score">{score.total}</span> {/* Display total score */}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
