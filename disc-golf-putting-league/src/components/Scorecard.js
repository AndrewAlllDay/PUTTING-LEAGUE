import React from 'react';

function Scorecard({ rounds, players }) {
  // Function to calculate total score across all rounds for each player
  const calculateTotalScore = (player) => {
    return rounds.reduce((total, round) => {
      const playerScores = round[player] || [];
      return total + playerScores.reduce((sum, score) => sum + score, 0);
    }, 0);
  };

  return (
    <div>
      <h2>Scorecard</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player}</td>
              <td>{calculateTotalScore(player)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Scorecard;
