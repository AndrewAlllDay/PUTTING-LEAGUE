// src/components/AddPlayer.js
import React, { useState } from 'react';

const AddPlayer = ({ onAdd }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim() !== '') {
      onAdd(playerName);
      setPlayerName(''); // Clear input after submission
    }
  };

  return (
    <div className="add-player">
      <form onSubmit={handleSubmit} className="add-player-form">
        <input
          type="text"
          placeholder="Enter player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="player-input"
        />
        <button type="submit" className="add-player-button">
          Add Player
        </button>
      </form>
    </div>
  );
};

export default AddPlayer;
