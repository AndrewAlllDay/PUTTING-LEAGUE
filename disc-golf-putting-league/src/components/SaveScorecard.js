// components/SaveScorecard.js
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
    <div>
      <h2>Scorecard Results</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player}>
              <td>{player}</td>
              <td>{calculateTotalScore(player)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaveScorecard;
