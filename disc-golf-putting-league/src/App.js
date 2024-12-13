import React, { useState, useEffect } from 'react';
import AddPlayer from './components/AddPlayer';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [currentStationIndex, setCurrentStationIndex] = useState(0); // Always start from station 1
  const [roundCompleted, setRoundCompleted] = useState(false);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [cardCreated, setCardCreated] = useState(false);

  // Max score for each station
  const stationMaxScores = [5, 10, 7, 8, 6]; // Max scores for each station (5 stations in total)

  const handleAddPlayer = (playerName) => {
    setPlayers((prevPlayers) => [...prevPlayers, playerName]);
  };

  const handleStartRound = () => {
    // Create a new round with scores initialized to 0 for each station
    const newRound = players.reduce((acc, player) => {
      acc[player] = Array(5).fill(0); // 5 stations, each with a score of 0
      return acc;
    }, {});
    setRounds([newRound]);
    setCurrentStationIndex(0); // Always start from station 1
    setRoundCompleted(false);
    setCurrentRoundIndex(0);
    setCardCreated(true); // Card is created once the round starts
  };

  const handleUpdateScore = (roundIndex, player, stationIndex, score) => {
    setRounds((prevRounds) => {
      const updatedRounds = [...prevRounds];
      updatedRounds[roundIndex][player][stationIndex] = score;
      return updatedRounds;
    });
  };

  const handleNextStation = () => {
    setCurrentStationIndex((prevStationIndex) => {
      const nextStation = (prevStationIndex + 1) % 5; // This will loop back to station 1 after station 5
      return nextStation;
    });
  };

  const handleNextRound = () => {
    if (rounds.length >= 3) {
      return; // Prevent adding more than 3 rounds
    }

    const newRound = players.reduce((acc, player) => {
      acc[player] = Array(5).fill(0); // Reset for the new round
      return acc;
    }, {});
    setRounds((prevRounds) => [...prevRounds, newRound]);
    setCurrentStationIndex(0); // Always start from station 1
    setRoundCompleted(false);
    setCurrentRoundIndex((prevIndex) => prevIndex + 1);
  };

  const checkRoundCompletion = () => {
    const round = rounds[currentRoundIndex];
    const allPlayersCompleted = players.every((player) => {
      return round[player] && round[player].every((score) => score !== 0);
    });

    if (allPlayersCompleted) {
      setRoundCompleted(true);
    } else {
      setRoundCompleted(false);
    }
  };

  const calculateRoundTotal = (round, player) => {
    if (!round || !round[player]) return 0;
    return round[player].reduce((sum, score) => sum + score, 0);
  };

  // Check if the round is complete whenever the round or scores change
  useEffect(() => {
    if (rounds.length > 0) {
      checkRoundCompletion();
    }
  }, [rounds, players, currentRoundIndex, currentStationIndex]);

  return (
    <div className="app-container">
      <div className="app-main">
        {/* Hide title after card is created */}
        {!cardCreated && <h1 className="title">Disc Golf Putting League</h1>}

        {/* Hide AddPlayer and Player List after the card is created */}
        {!cardCreated && (
          <>
            <AddPlayer onAdd={handleAddPlayer} />
            <ul>
              {players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </>
        )}

        {/* Show the "Create Card" button only when there are at least 2 players and the card isn't created */}
        {!cardCreated && players.length >= 2 && (
          <button onClick={handleStartRound} disabled={players.length < 2}>
            Create Card
          </button>
        )}

        {/* Round Header */}
        {rounds.length > 0 && (
          <div className="round-header">
            <h2>Round {currentRoundIndex + 1}</h2>
          </div>
        )}

        {/* Render the current round */}
        {rounds.map((round, roundIndex) => {
          if (roundIndex !== currentRoundIndex) {
            return null;
          }

          return (
            <div key={roundIndex}>
              {/* Display all player scores for the current station */}
              <h3>Station {currentStationIndex + 1}</h3>
              <div>
                {players.map((player, index) => (
                  <div key={index}>
                    <h4>{player}</h4>
                    <input
                      type="number"
                      placeholder="Station score"
                      value={round[player][currentStationIndex] || ''}
                      onChange={(e) => {
                        const newScore = Number(e.target.value);
                        const maxScore = stationMaxScores[currentStationIndex];
                        if (newScore <= maxScore) {
                          handleUpdateScore(
                            roundIndex,
                            player,
                            currentStationIndex,
                            newScore
                          );
                        }
                      }}
                      max={stationMaxScores[currentStationIndex]}
                    />
                  </div>
                ))}
              </div>

              {/* Show the "Next Station" button only if all players have completed the current station */}
              {players.every((player) => round[player][currentStationIndex] !== 0) && currentStationIndex < 4 && (
                <button onClick={handleNextStation}>
                  Next Station
                </button>
              )}
            </div>
          );
        })}

        {/* Only show the "Next Round" button if the round is complete and it's the last station */}
        {roundCompleted && currentRoundIndex < 2 && currentStationIndex === 4 && (
          <button
            onClick={handleNextRound}
            disabled={players.length === 0 || rounds.length >= 3}
          >
            Next Round
          </button>
        )}

        {/* Show Previous Round button if it's not the first round */}
        {currentRoundIndex > 0 && (
          <button
            onClick={() => setCurrentRoundIndex((prevIndex) => prevIndex - 1)}
          >
            Previous Round
          </button>
        )}

        {/* Show Save Scorecard button after 3 rounds */}
        {rounds.length === 3 && roundCompleted && (
          <button onClick={() => { /* Save scorecard logic */ }}>Save Scorecard</button>
        )}
      </div>
    </div>
  );
}

export default App;
