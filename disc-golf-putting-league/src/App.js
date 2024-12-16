import React, { useState } from "react";
import "./App.css"; // Import the CSS file
import Logo from "./components/Logo";
import PlayerInput from "./components/PlayerInput";
import PlayerList from "./components/PlayerList";
import RoundStation from "./components/RoundStation";
import NextRoundButton from "./components/NextRoundButton";
import SaveScorecard from "./components/SaveScorecard";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [cardCreated, setCardCreated] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentStation, setCurrentStation] = useState(1);
  const [scores, setScores] = useState({});
  const [currentRoundCompleted, setCurrentRoundCompleted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const TOTAL_STATIONS = 5;
  const TOTAL_ROUNDS = 3;

  // Add player to the list
  const addPlayer = () => {
    if (playerName && !players.includes(playerName)) {
      setPlayers([...players, playerName]);
      setPlayerName("");
    }
  };

  // Create the card
  const createCard = () => {
    setCardCreated(true);
    const initialScores = {};
    players.forEach((player) => {
      initialScores[player] = {};
    });
    setScores(initialScores);
  };

  // Handle score change
  const handleScoreChange = (player, value) => {
    setScores((prevScores) => {
      const updatedScores = {
        ...prevScores,
        [player]: {
          ...prevScores[player],
          [currentRound]: {
            ...prevScores[player]?.[currentRound],
            [currentStation]: value,
          },
        },
      };

      checkCurrentRoundCompleted(updatedScores); // Pass updated scores
      return updatedScores;
    });
  };

  // Check if the current round is completed
  const checkCurrentRoundCompleted = (updatedScores) => {
    const isCompleted = players.every((player) =>
      Array.from({ length: TOTAL_STATIONS }, (_, i) =>
        updatedScores[player]?.[currentRound]?.[i + 1]
      ).every((score) => score !== undefined && score !== "")
    );
    setCurrentRoundCompleted(isCompleted);
  };

  // Move to the next station
  const goToNextStation = () => {
    if (currentStation < TOTAL_STATIONS) {
      setCurrentStation(currentStation + 1);
    } else {
      setCurrentStation(1);
    }
    setCurrentRoundCompleted(false);
  };

  // Move to the next round
  const goToNextRound = () => {
    if (currentRound < TOTAL_ROUNDS) {
      setCurrentRound(currentRound + 1);
      setCurrentStation(1);
      setCurrentRoundCompleted(false);
    } else {
      setGameCompleted(true);
    }
  };

  // Start over and reset the app to the initial state
  const startOver = () => {
    setPlayers([]);
    setPlayerName("");
    setCardCreated(false);
    setCurrentRound(1);
    setCurrentStation(1);
    setScores({});
    setCurrentRoundCompleted(false);
    setGameCompleted(false);
  };

  return (
    <div className="App">
      <Logo />

      {/* Player input and list */}
      {!cardCreated && (
        <div>
          <PlayerInput
            playerName={playerName}
            setPlayerName={setPlayerName}
            addPlayer={addPlayer}
          />
          {players.length > 0 && <PlayerList players={players} />}
        </div>
      )}

      {/* Create Card button */}
      {!cardCreated && players.length >= 2 && (
        <button onClick={createCard}>Create Card</button>
      )}

      {/* Game play components */}
      {cardCreated && !gameCompleted && (
        <div>
          <RoundStation
            players={players}
            currentRound={currentRound}
            currentStation={currentStation}
            scores={scores}
            handleScoreChange={handleScoreChange}
            goToNextStation={goToNextStation}
          />
          <NextRoundButton
            currentRoundCompleted={currentRoundCompleted}
            currentRound={currentRound}
            goToNextRound={goToNextRound}
          />
        </div>
      )}

      {/* Save scorecard */}
      {gameCompleted && (
        <div>
          <SaveScorecard players={players} scores={scores} />
        </div>
      )}

      {/* Sticky Start Over Button */}
      {cardCreated && (
        <div className="start-over-btn-container">
          <button className="start-over-btn" onClick={startOver}>
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
