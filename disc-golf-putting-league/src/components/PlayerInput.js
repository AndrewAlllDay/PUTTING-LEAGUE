import React, { useState } from "react";

const PlayerInput = ({ playerName, setPlayerName, addPlayer }) => {
  const [division, setDivision] = useState(""); // State for division

  const handleAddPlayer = () => {
    addPlayer(division); // Pass division to addPlayer
    setDivision(""); // Reset division field
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddPlayer(); // Use the function to add and reset
    }
  };

  return (
    <div>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter player name"
      />
      <input
        type="text"
        value={division}
        onChange={(e) => setDivision(e.target.value)}
        placeholder="Enter division"
      />
      <button
        className="add-player"
        onClick={handleAddPlayer} // Use the function to add and reset
      >
        Add Player
      </button>
    </div>
  );
};

export default PlayerInput;
