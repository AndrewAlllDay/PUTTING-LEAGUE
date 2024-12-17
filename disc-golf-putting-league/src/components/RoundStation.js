import React from "react";

const RoundStation = ({
  players,
  divisions, // Added divisions prop
  currentRound,
  currentStation,
  scores,
  handleScoreChange,
  goToNextStation,
}) => {
  // Function to calculate running total for a player (resets after each round)
  const calculateRunningTotal = (player) => {
    let total = 0;
    // Only sum the scores for the current round
    for (let station = 1; station <= currentStation; station++) {
      total += parseInt(scores[player]?.[currentRound]?.[station] || 0, 10);
    }
    return total;
  };

  // Function to check if all scores for the current station are filled
  const allScoresFilled = () => {
    return players.every(
      (player) =>
        scores[player]?.[currentRound]?.[currentStation] !== undefined &&
        scores[player][currentRound][currentStation] !== ""
    );
  };

  if (!players || !divisions || players.length !== divisions.length) {
    return <div>Error: Mismatch between players and divisions</div>;
  }

  return (
    <div>
      <h2 className="RoundStation">
        Round {currentRound} - Station {currentStation}
      </h2>

      {/* Player Rows */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
        {players.map((player, index) => (
          <div key={player} className="player-row">
            <span className="player-name">{player}</span>
            <span className="player-division">{divisions[index]}</span>
            <input
              type="number"
              value={scores[player]?.[currentRound]?.[currentStation] || ""}
              onChange={(e) =>
                handleScoreChange(player, e.target.value)
              }
            />
            <span className="running-total">
              Running Total: {calculateRunningTotal(player)}
            </span>
          </div>
        ))}
      </div>

      {/* Button to go to next station */}
      {allScoresFilled() && (
        <button onClick={goToNextStation} style={{ marginTop: "20px" }}>
          Go to Next Station
        </button>
      )}
    </div>
  );
};

export default RoundStation;
