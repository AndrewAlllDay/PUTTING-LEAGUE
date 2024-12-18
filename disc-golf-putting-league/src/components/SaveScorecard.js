import React from "react";

const SaveScorecard = ({ players, totals, divisions }) => {
  return (
    <div>
      <h3>Game Completed! Scores</h3>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Division</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player}>
              <td>{player}</td>
              <td>{divisions[index]}</td> {/* Display division */}
              <td>{totals[player]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaveScorecard;
