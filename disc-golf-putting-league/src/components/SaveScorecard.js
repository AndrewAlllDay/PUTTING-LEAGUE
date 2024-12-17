import React, { useState } from "react";
import "../App.css"; // Import the CSS file for SaveScorecard
import { db } from '../firebase'; // Import the Firestore db instance
import { collection, addDoc } from "firebase/firestore"; // Firestore functions for adding documents

const SaveScorecard = ({ players, totals }) => {
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [submitted, setSubmitted] = useState(false); // State to track whether the scorecard has been submitted

  // Function to save scores to Firestore
  const saveScoresToFirebase = async () => {
    if (submitted) return; // Prevent submission if already submitted

    try {
      // Prepare the scores data
      const scoresToSave = players.map((player) => ({
        player,
        total: totals[player] || 0,
      }));

      // Add the scores to Firestore
      await addDoc(collection(db, "scores"), {
        gameDate: new Date(),
        scores: scoresToSave,
      });

      console.log("Scores successfully saved to Firebase!");

      // Show the success popup
      setShowPopup(true);
      setSubmitted(true); // Mark the scorecard as submitted

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

    } catch (error) {
      console.error("Error saving scores: ", error);
      alert("Error saving scores to Firebase!");
    }
  };

  return (
    <div className="scorecard-container">
      <h2 className="scorecard-title">Scorecard Results</h2>
      <div className="scorecard-table">
        <div className="scorecard-header">
          <div className="header-player">Player</div>
          <div className="header-score">Total Score</div>
        </div>
        {players.map((player) => (
          <div className="scorecard-row" key={player}>
            <div className="player-name">{player}</div>
            <div className="player-score">{totals[player] || 0}</div>
          </div>
        ))}
      </div>

      {/* Button to trigger manual save, disabled after submission */}
      <button
        className="save-button"
        onClick={saveScoresToFirebase}
        disabled={submitted} // Disable button after submission
      >
        {submitted ? "Scorecard Submitted" : "Save Scorecard to Firebase"}
      </button>

      {/* Popup notification */}
      {showPopup && (
        <div className="popup">
          Scores saved to Firebase!
        </div>
      )}
    </div>
  );
};

export default SaveScorecard;
