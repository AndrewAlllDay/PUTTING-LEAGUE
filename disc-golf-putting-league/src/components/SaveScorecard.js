import React from "react";

const SaveScorecard = ({ players, scores }) => {
  const calculateTotalScore = (player) => {
    let totalScore = 0;
    for (let round = 1; round <= 3; round++) {
      for (let station = 1; station <= 5; station++) {
        totalScore += parseInt(scores[round]?.[station]?.[player] || 0);
      }
    }
    return totalScore;
  };

  return (
    <div className="scorecard-container">
      <h2>Scorecard Results</h2>
      <table className="scorecard-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player}>
              <td className="player-name">{player}</td>
              <td className="player-total">{calculateTotalScore(player)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaveScorecard;
