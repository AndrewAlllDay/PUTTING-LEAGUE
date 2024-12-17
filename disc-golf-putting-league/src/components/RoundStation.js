import React from "react";
import "./RoundStation.css";

const RoundStation = ({
  players,
  divisions,
  currentRound,
  currentStation,
  scores,
  handleScoreChange,
  goToNextStation,
}) => {
  const calculateRunningTotal = (player) => {
    let total = 0;
    for (let station = 1; station <= currentStation; station++) {
      total += parseInt(scores[player]?.[currentRound]?.[station] || 0, 10);
    }
    return total;
  };

  const allScoresFilled = () => {
    return players.every(
      (player) =>
        scores[player]?.[currentRound]?.[currentStation] !== undefined &&
        scores[player][currentRound][currentStation] !== ""
    );
  };

  if (!players || !divisions || players.length !== divisions.length) {
    return <div className="error-message">Error: Mismatch between players and divisions</div>;
  }

  return (
    <div className="round-station-container">
      <h2 className="round-header">
        Round {currentRound} - Station {currentStation}
      </h2>

      <div className="player-grid">
        {players.map((player, index) => (
          <div key={player} className="player-row">
            <span className="player-name">{player}</span>
            <input
              type="number"
              className="score-input"
              value={scores[player]?.[currentRound]?.[currentStation] || ""}
              onChange={(e) => handleScoreChange(player, e.target.value)}
              placeholder="Score"
            />
            <span className="running-total">
              Total: {calculateRunningTotal(player)}
            </span>
          </div>
        ))}
      </div>

      {allScoresFilled() && currentStation < 5 && (
        <button className="next-station-button" onClick={goToNextStation}>
          Go to Next Station
        </button>
      )}
    </div>
  );
};

export default RoundStation;
