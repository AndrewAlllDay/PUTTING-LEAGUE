import React from 'react';

function NextRoundButton({ handleNextRound, players, rounds }) {
  return (
    <button
      onClick={handleNextRound}
      disabled={players.length === 0 || rounds.length >= 3}
    >
      Next Round
    </button>
  );
}

export default NextRoundButton;
