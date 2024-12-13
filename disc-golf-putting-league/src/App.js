import React, { useState, useEffect } from 'react';
import AddPlayer from './components/AddPlayer';
import Round from './components/Round'; // Importing Round as a separate component
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [roundCompleted, setRoundCompleted] = useState(false);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [cardCreated, setCardCreated] = useState(false);

  const stationMaxScores = [5, 10, 7, 8, 6];

  const handleAddPlayer = (playerName) => {
    setPlayers((prevPlayers) => [...prevPlayers, playerName]);
  };

  const handleStartRound = () => {
    const newRound = players.reduce((acc, player) => {
      acc[player] = Array(5).fill(0);
      return acc;
    }, {});
    setRounds([newRound]);
    setCurrentStationIndex(0);
    setRoundCompleted(false);
    setCurrentRoundIndex(0);
    setCardCreated(true);
  };

  const handleUpdateScore = (roundIndex, player, stationIndex, score) => {
    setRounds((prevRounds) => {
      const updatedRounds = [...prevRounds];
      if (!updatedRounds[roundIndex][player]) {
        updatedRounds[roundIndex][player] = Array(5).fill(0); // Safeguard against undefined players
      }
      updatedRounds[roundIndex][player][stationIndex] = score;
      return updatedRounds;
    });
  };

  const handleNextStation = () => {
    setCurrentStationIndex((prevStationIndex) => {
      const nextStation = (prevStationIndex + 1) % 5;
      return nextStation;
    });
  };

  const handleNextRound = () => {
    if (rounds.length >= 3) return;

    const newRound = players.reduce((acc, player) => {
      acc[player] = Array(5).fill(0);
      return acc;
    }, {});
    setRounds((prevRounds) => [...prevRounds, newRound]);
    setCurrentStationIndex(0);
    setRoundCompleted(false);
    setCurrentRoundIndex((prevIndex) => prevIndex + 1);
  };

  const calculateRoundTotal = (round, player) => {
    if (!round || !round[player]) return 0;
    return round[player].reduce((sum, score) => sum + score, 0);
  };

  useEffect(() => {
    if (rounds.length > 0) {
      const currentRound = rounds[currentRoundIndex];
      const allPlayersCompleted = players.every((player) => {
        return currentRound[player]?.every((score) => score !== 0);
      });
      setRoundCompleted(allPlayersCompleted);
    }
  }, [rounds, players, currentRoundIndex]);

  return (
    <div className="app-container">
      <div className="app-main">
        {!cardCreated && <h1 className="title">Disc Golf Putting League</h1>}
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
        {!cardCreated && players.length >= 2 && (
          <button onClick={handleStartRound} disabled={players.length < 2}>
            Create Card
          </button>
        )}
        {rounds.length > 0 && (
          <Round
            players={players}
            rounds={rounds}
            currentRoundIndex={currentRoundIndex}
            currentStationIndex={currentStationIndex}
            stationMaxScores={stationMaxScores}
            handleUpdateScore={handleUpdateScore}
            handleNextStation={handleNextStation}
            roundCompleted={roundCompleted}
            handleNextRound={handleNextRound}
          />
        )}
      </div>
    </div>
  );
}

export default App;
