// components/PlayerInput.js
import React, { useState } from "react";

const PlayerInput = ({ playerName, setPlayerName, addPlayer }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addPlayer();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        onKeyPress={handleKeyPress} // Listen for Enter key press
        placeholder="Enter player name"
      />
      <button onClick={addPlayer}>Add Player</button>
    </div>
  );
};

export default PlayerInput;
