import React from 'react';

function Scorecard({ totalScores = {}, players = [] }) {
  if (players.length === 0) {
    return <p>No players to display.</p>;
  }

  return (
    <div className="scorecard-container">
      <h2>Final Scores</h2>
      <div className="scorecard-list">
        {players.map((player, index) => {
          // Ensure totalScores[player] exists and is an array before accessing it
          const playerScores = totalScores[player] || [];
          const total = playerScores.reduce((sum, score) => sum + score, 0); // Calculate total score

          return (
            <div key={index} className="scorecard-item">
              <span className="player-name">{player}</span>
              <span className="player-total">{total || 0}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Scorecard;
