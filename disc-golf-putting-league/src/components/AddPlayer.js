import React, { useState } from 'react';

function AddPlayer({ onAdd }) {
    const [playerName, setPlayerName] = useState('');

    const handleAdd = () => {
        if (playerName.trim() === '') return; // Prevent adding empty names
        onAdd(playerName);
        setPlayerName(''); // Clear input after adding
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div>
            <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={handleKeyPress} // Trigger on key press
                placeholder="Enter player name"
            />
            <button onClick={handleAdd}>Add Player</button>
        </div>
    );
}

export default AddPlayer;
