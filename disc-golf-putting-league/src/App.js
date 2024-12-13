import React, { useState } from 'react';
import AddPlayer from './components/AddPlayer';
import Round from './components/Round';
import Scorecard from './components/Scorecard';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [roundCompleted, setRoundCompleted] = useState(false);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [cardCreated, setCardCreated] = useState(false);
  const [viewScorecard, setViewScorecard] = useState(false);

  const stationMaxScores = [25, 25, 25, 25, 25];

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

  const handleSaveScorecard = () => {
    setViewScorecard(true);
  };

  return (
    <div className="app-container">
      <div className="app-main">
        {viewScorecard ? (
          // Only render the Scorecard component when viewScorecard is true
          <Scorecard rounds={rounds} players={players} />
        ) : (
          <>
            {/* Render other components when viewScorecard is false */}
            {!cardCreated && <h1 className="title">Johnson Winter Putting League</h1>}
            {!cardCreated && (
              <>
                <AddPlayer onAdd={handleAddPlayer} />
                {players.length > 0 && <h2 className="card-title">Your Card</h2>}
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
                onSaveScorecard={handleSaveScorecard}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
