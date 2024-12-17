import React, { useState } from "react";

const PlayerInput = ({ playerName, setPlayerName, addPlayer }) => {
  const [division, setDivision] = useState(""); // State for division

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addPlayer(division); // Pass division to addPlayer
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
        onClick={() => addPlayer(division)} // Pass division to addPlayer
      >
        Add Player
      </button>
    </div>
  );
};

export default PlayerInput;
