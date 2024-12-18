import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";  // Import db for Firebase
import "../App.css";  // Import the styles for SaveScorecard.js

const SaveScorecard = ({ players, totals, divisions }) => {
  const [isSaving, setIsSaving] = useState(false);  // Track if the button is clicked
  const [error, setError] = useState(null);  // Track any errors during saving

  const saveScoresToFirebase = async () => {
    if (isSaving) return;  // Prevent multiple submissions if already saving
    setIsSaving(true);  // Disable button during the save process

    try {
      const scoresToSave = players.map((player) => ({
        player,
        division: divisions[players.indexOf(player)], // Attach division if needed
        totalScore: totals[player], // Attach total score
      }));

      await addDoc(collection(db, "scores"), {
        gameDate: new Date(),
        scores: scoresToSave, // Store detailed scores
      });

      alert("Scores successfully saved to Firebase!");
    } catch (error) {
      console.error("Error saving scores: ", error);
      setError("Error saving scores to Firebase.");
    } finally {
      setIsSaving(false);  // Re-enable the button after save process is complete
    }
  };

  return (
    <div className="save-scorecard-container">
      <h3>Game Completed! Scores</h3>
      <table className="scorecard-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Division</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player}>
              <td>{player}</td>
              <td>{divisions[index]}</td>
              <td>{totals[player]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show error if any */}
      {error && <p className="error-message">{error}</p>}

      <button
        onClick={saveScoresToFirebase}
        disabled={isSaving}
        className={`save-button ${isSaving ? "saving" : ""}`}  // Add a class based on saving state
      >
        {isSaving ? "Saving..." : "Save Scores to Firebase"}
      </button>
    </div>
  );
};

export default SaveScorecard;
