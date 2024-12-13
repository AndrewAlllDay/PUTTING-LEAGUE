import React from 'react';

function PlayerList({ players }) {
  return (
    <ul>
      {players.map((player, index) => (
        <li key={index}>{player}</li>
      ))}
    </ul>
  );
}

export default PlayerList;
