import React, { useState } from "react";
import "./App.css";

// Import components
import SaveScorecard from "./components/SaveScorecard";
import PlayerList from "./components/PlayerList";
import PlayerInput from "./components/PlayerInput";
import RoundStation from "./components/RoundStation";
import NextRoundButton from "./components/NextRoundButton";
import Logo from "./components/Logo";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentStation, setCurrentStation] = useState(1);
  const [scores, setScores] = useState({});
  const [playerName, setPlayerName] = useState("");
  const [cardCreated, setCardCreated] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Reset all states
  const resetGame = () => {
    setPlayers([]);
    setCurrentRound(1);
    setCurrentStation(1);
    setScores({});
    setPlayerName("");
    setCardCreated(false);
    setGameOver(false);
    setShowResults(false);
  };

  const addPlayer = () => {
    if (playerName.trim() !== "" && players.length < 6) {
      setPlayers([...players, playerName.trim()]);
      setPlayerName("");
    } else if (players.length >= 6) {
      alert("You cannot add more than 6 players to a card.");
    }
  };

  const handleScoreChange = (player, score) => {
    setScores((prevScores) => ({
      ...prevScores,
      [currentRound]: {
        ...prevScores[currentRound],
        [currentStation]: {
          ...prevScores[currentRound]?.[currentStation],
          [player]: score,
        },
      },
    }));
  };

  const goToNextStation = () => {
    setScores((prevScores) => ({
      ...prevScores,
      [currentRound]: {
        ...prevScores[currentRound],
        [currentStation]: {
          ...prevScores[currentRound]?.[currentStation],
          completed: true,
        },
      },
    }));
    setCurrentStation((prevStation) => prevStation + 1);
  };

  const goToNextRound = () => {
    setCurrentRound((prevRound) => prevRound + 1);
    setCurrentStation(1);
  };

  const createCard = () => {
    if (players.length >= 2) {
      setCardCreated(true);
    } else {
      alert("You need at least 2 players to create a card.");
    }
  };

  const allScoresFilled =
    players.length > 0 &&
    players.every(
      (player) =>
        scores[currentRound]?.[currentStation]?.[player] !== undefined &&
        scores[currentRound]?.[currentStation]?.[player] !== ""
    );

  const allStationsCompleted =
    players.length > 0 &&
    players.every((player) => {
      return [1, 2, 3, 4, 5].every(
        (station) => scores[currentRound]?.[station]?.[player] !== undefined
      );
    });

  const currentRoundCompleted =
    currentStation === 5 && allStationsCompleted;

  const gameCompleted =
    currentRound === 3 && currentStation === 5 && allStationsCompleted;

  const saveScorecard = () => {
    setGameOver(true);
    setShowResults(true);
  };

  return (
    <div className="App">
      <Logo />

      {!cardCreated && (
        <div>
          <PlayerInput
            playerName={playerName}
            setPlayerName={setPlayerName}
            addPlayer={addPlayer}
          />
        </div>
      )}

      {players.length > 0 && <PlayerList players={players} />}

      {!cardCreated && players.length >= 2 && (
        <button onClick={createCard}>Create Card</button>
      )}

      {cardCreated && currentRound <= 3 && !gameOver && (
        <div>
          <RoundStation
            players={players}
            currentRound={currentRound}
            currentStation={currentStation}
            scores={scores}
            handleScoreChange={handleScoreChange}
            goToNextStation={goToNextStation}
            allScoresFilled={allScoresFilled} // Pass this prop
          />
          <NextRoundButton
            currentRoundCompleted={currentRoundCompleted}
            currentRound={currentRound}
            goToNextRound={goToNextRound}
          />
          {gameCompleted && (
            <div>
              <button onClick={saveScorecard}>Save Scorecard</button>
            </div>
          )}
        </div>
      )}

      {showResults && <SaveScorecard players={players} scores={scores} />}

      {/* Start Over button */}
      <button className="start-over" onClick={resetGame}>
        Start Over
      </button>
    </div>
  );
};

export default App;
