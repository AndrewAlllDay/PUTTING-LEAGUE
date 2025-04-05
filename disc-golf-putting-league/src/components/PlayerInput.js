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

  const handlePlayerNameChange = (e) => {
    const value = e.target.value;
    // Capitalize the first letter and keep the rest unchanged
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setPlayerName(capitalizedValue);
  };

  const handleDivisionChange = (e) => {
    const value = e.target.value.toUpperCase(); // Capitalize input
    if (["A", "B", "F", "Y"].includes(value) || value === "") {
      setDivision(value); // Only set the division if it's one of the valid values
    }
  };

  return (
    <div className="pb-40">
      <input
        type="text"
        value={playerName}
        onChange={handlePlayerNameChange} // Use custom handler
        onKeyPress={handleKeyPress}
        placeholder="Player name"
      />
      <input
        type="text"
        value={division}
        onChange={handleDivisionChange} // Use custom handler
        placeholder="Division"
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
