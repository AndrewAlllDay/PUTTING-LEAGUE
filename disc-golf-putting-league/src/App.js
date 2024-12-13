import React, { useState, useEffect } from 'react';
import AddPlayer from './components/AddPlayer';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [roundCompleted, setRoundCompleted] = useState(false);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);

  const handleAddPlayer = (playerName) => {
    setPlayers((prevPlayers) => [...prevPlayers, playerName]);
  };

  const handleStartRound = () => {
    const newRound = players.reduce((acc, player) => {
      acc[player] = Array(5).fill(0); // 5 stations, each with a score of 0
      return acc;
    }, {});
    setRounds([newRound]);
    setRoundCompleted(false);
    setCurrentRoundIndex(0);
  };

  const handleUpdateScore = (roundIndex, player, stationIndex, score) => {
    setRounds((prevRounds) => {
      const updatedRounds = [...prevRounds];
      updatedRounds[roundIndex][player][stationIndex] = score;
      return updatedRounds;
    });
  };

  const handleNextPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const calculateRoundTotal = (round, player) => {
    if (!round || !round[player]) return 0;
    return round[player].reduce((sum, score) => sum + score, 0);
  };

  const checkRoundCompletion = () => {
    const currentRound = rounds[currentRoundIndex];
    const allPlayersCompleted = players.every((player) =>
      currentRound[player]?.every((score) => score !== 0)
    );
    setRoundCompleted(allPlayersCompleted);
  };

  useEffect(() => {
    if (rounds.length > 0) {
      checkRoundCompletion();
    }
  }, [rounds, players, currentRoundIndex]);

  return (
    <div className="app-container">
      <div className="app-main">
        <h1>Disc Golf Putting League</h1>

        {/* Add Player form and player list */}
        {!rounds.length && (
          <>
            <AddPlayer onAdd={handleAddPlayer} />
            <ul>
              {players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
            <button
              onClick={handleStartRound}
              disabled={players.length < 2} // Require a minimum of 2 players
            >
              Start New Round
            </button>
          </>
        )}

        {/* Render current player's form */}
        {rounds.length > 0 && (
          <div>
            <h2>Round {currentRoundIndex + 1}</h2>
            <h3>Player: {players[currentPlayerIndex]}</h3>
            {rounds[currentRoundIndex][players[currentPlayerIndex]]?.map(
              (score, stationIndex) => (
                <div key={stationIndex}>
                  <h4>Station {stationIndex + 1}</h4>
                  <input
                    type="number"
                    value={score}
                    onChange={(e) =>
                      handleUpdateScore(
                        currentRoundIndex,
                        players[currentPlayerIndex],
                        stationIndex,
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
              )
            )}
            <h4>
              Total for {players[currentPlayerIndex]}:{' '}
              {calculateRoundTotal(
                rounds[currentRoundIndex],
                players[currentPlayerIndex]
              )}
            </h4>
            <button onClick={handleNextPlayer}>Next Player</button>
          </div>
        )}

        {/* Next Round button */}
        {roundCompleted && currentRoundIndex < 2 && (
          <button
            onClick={() => {
              setRounds((prevRounds) => [
                ...prevRounds,
                players.reduce((acc, player) => {
                  acc[player] = Array(5).fill(0);
                  return acc;
                }, {}),
              ]);
              setCurrentPlayerIndex(0); // Reset to the first player
              setCurrentRoundIndex((prevIndex) => prevIndex + 1);
            }}
          >
            Next Round
          </button>
        )}

        {/* Save Scorecard button */}
        {roundCompleted && currentRoundIndex === 2 && (
          <button
            onClick={() => {
              console.log('Scores saved:', rounds);
              // Add Firestore save logic here
            }}
          >
            Save Scorecard
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
