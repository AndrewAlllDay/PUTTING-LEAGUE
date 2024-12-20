import React, { useState } from "react";
import "../App.css"; // Import the CSS file

const PlayerInput = ({ playerName, setPlayerName, addPlayer }) => {
  const [division, setDivision] = useState(""); // State for division
  const [error, setError] = useState(""); // State for error message

  const handleAddPlayer = () => {
    if (!division) {
      setError("Division is required"); // Display error if division is empty
      return;
    }
    addPlayer(division); // Pass division to addPlayer
    setDivision(""); // Reset division field
    setError(""); // Clear error message
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
      setError(""); // Clear error when user starts typing
    }
  };

  return (
    <div className="pb-40">
      <div className="input-wrapper">
        <label htmlFor="player-name" className="input-label">
          Player Name
        </label>
        <input
          id="player-name"
          type="text"
          value={playerName}
          onChange={handlePlayerNameChange} // Use custom handler
          onKeyPress={handleKeyPress}
          placeholder=" "
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="division" className="input-label">
          Division
        </label>
        <input
          id="division"
          type="text"
          value={division}
          onChange={handleDivisionChange} // Use custom handler
          placeholder=" "
        />
        {error && <div className="error">{error}</div>} {/* Display error message if division is empty */}
      </div>

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
