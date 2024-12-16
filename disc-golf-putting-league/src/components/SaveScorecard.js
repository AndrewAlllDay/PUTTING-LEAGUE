import React from "react";
import "../App.css"; // Import the CSS file for SaveScorecard

const SaveScorecard = ({ players, totals }) => {
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
    </div>
  );
};

export default SaveScorecard;
