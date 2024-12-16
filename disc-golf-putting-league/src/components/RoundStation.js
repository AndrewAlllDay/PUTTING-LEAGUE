import React from "react";

const RoundStation = ({
  players,
  currentRound,
  currentStation,
  scores,
  handleScoreChange,
  goToNextStation,
}) => {
  const allScoresEntered =
    players.length > 0 &&
    players.every(
      (player) =>
        scores[player]?.[currentRound]?.[currentStation] !== undefined &&
        scores[player]?.[currentRound]?.[currentStation] !== ""
    );

  return (
    <div>
      <h2>
        Round {currentRound} - Station {currentStation}
      </h2>
      {players.map((player) => (
        <div key={player}>
          <label>{player}:</label>
          <input
            type="number"
            value={scores[player]?.[currentRound]?.[currentStation] || ""}
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
