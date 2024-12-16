// components/PlayerList.js
import React from "react";

const PlayerList = ({ players }) => (
  <div>
    <h3>Your Card</h3>
    <ul className="name-list">
      {players.map((player, index) => (
        <li key={index}>{player}</li>
      ))}
    </ul>
  </div>
);

export default PlayerList;
