// components/RoundStation.js
import React from "react";

const RoundStation = ({
  players,
  currentRound,
  currentStation,
  scores,
  handleScoreChange,
  goToNextStation,
  allScoresFilled, // Passed from App.js
}) => {
  // Check if all the scores for the current station are entered
  const allScoresEntered =
    players.length > 0 &&
    players.every(
      (player) =>
        scores[currentRound]?.[currentStation]?.[player] !== undefined &&
        scores[currentRound]?.[currentStation]?.[player] !== ""
    );

  return (
    <div>
      <h2 className="RoundStation">Round {currentRound} - Station {currentStation}</h2>
      {players.map((player) => (
        <div key={player}>
          <label>{player}:</label>
          <input
            type="number"
            value={scores[currentRound]?.[currentStation]?.[player] || ""}
            onChange={(e) => handleScoreChange(player, e.target.value)}
          />
        </div>
      ))}
      {allScoresEntered && currentStation < 5 && (
        <button onClick={goToNextStation}>Next Station</button>
      )}
    </div>
  );
};

export default RoundStation;
