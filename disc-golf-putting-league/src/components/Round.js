import React from 'react';

function Round({
  players,
  rounds,
  currentRoundIndex,
  currentStationIndex,
  stationMaxScores,
  handleUpdateScore,
  handleNextStation,
  roundCompleted,
  handleNextRound,
}) {
  const currentRound = rounds[currentRoundIndex] || {};

  // Helper function to calculate the total score for a player in the current round
  const calculateTotalScore = (player) => {
    const playerScores = currentRound[player] || [];
    return playerScores.reduce((sum, score) => sum + score, 0);
  };

  return (
    <div>
      <h2>Round {currentRoundIndex + 1}</h2>
      <h3>Station {currentStationIndex + 1}</h3>
      {players.map((player, index) => {
        const playerScores = currentRound[player] || [];
        const totalScore = calculateTotalScore(player); // Total score for the player
        return (
          <div key={index} className="player-score-card">
            <h4>{player}</h4>
            <p>Total Score: {totalScore}</p> {/* Display total score */}
            <input
              type="number"
              placeholder="Station score"
              value={playerScores[currentStationIndex] || ''}
              onChange={(e) => {
                const newScore = Number(e.target.value);
                const maxScore = stationMaxScores[currentStationIndex];
                if (newScore <= maxScore) {
                  handleUpdateScore(currentRoundIndex, player, currentStationIndex, newScore);
                }
              }}
              max={stationMaxScores[currentStationIndex]}
            />
          </div>
        );
      })}
      {players.every((player) => currentRound[player]?.[currentStationIndex] !== 0) &&
        currentStationIndex < 4 && (
          <button onClick={handleNextStation}>Next Station</button>
        )}
      {roundCompleted && currentRoundIndex < 2 && currentStationIndex === 4 && (
        <button onClick={handleNextRound}>Next Round</button>
      )}
    </div>
  );
}

export default Round;
