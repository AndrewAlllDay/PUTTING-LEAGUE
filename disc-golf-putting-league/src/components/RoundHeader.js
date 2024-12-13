import React from 'react';

function RoundHeader({ currentRoundIndex }) {
  return (
    <div className="round-header">
      <h2>Round {currentRoundIndex + 1}</h2>
    </div>
  );
}

export default RoundHeader;
