import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Logo from "./components/Logo";
import PlayerInput from "./components/PlayerInput";
import PlayerList from "./components/PlayerList";
import RoundStation from "./components/RoundStation";
import SaveScorecard from "./components/SaveScorecard";
import StartOverButton from './components/StartOverButton';  // Import the new component
import Dashboard from './pages/Dashboard'
import { db, addDoc, collection } from './firebase';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [cardCreated, setCardCreated] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentStation, setCurrentStation] = useState(1);
  const [scores, setScores] = useState({});
  const [currentRoundCompleted, setCurrentRoundCompleted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [showSaveScorecard, setShowSaveScorecard] = useState(false);  // Track visibility of SaveScorecard

  const TOTAL_STATIONS = 5;
  const TOTAL_ROUNDS = 3;

  useEffect(() => {
    const preventSwipeToRefresh = (e) => {
      if (window.scrollY === 0 && e.touches[0].clientY > 0) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventSwipeToRefresh, {
      passive: false, // Required to make preventDefault work
    });

    return () => {
      document.removeEventListener("touchmove", preventSwipeToRefresh);
    };
  }, []);

  const addPlayer = (division) => {
    if (playerName && !players.includes(playerName)) {
      setPlayers([...players, playerName]);
      setDivisions([...divisions, division]);
      setPlayerName("");
    }
  };

  const createCard = () => {
    setCardCreated(true);
    const initialScores = {};
    players.forEach((player) => {
      initialScores[player] = {};
    });
    setScores(initialScores);
  };

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

      checkCurrentRoundCompleted(updatedScores);
      return updatedScores;
    });
  };

  const checkCurrentRoundCompleted = (updatedScores) => {
    const isCompleted = players.every((player) =>
      Array.from({ length: TOTAL_STATIONS }, (_, i) =>
        updatedScores[player]?.[currentRound]?.[i + 1]
      ).every((score) => score !== undefined && score !== "")
    );
    setCurrentRoundCompleted(isCompleted);
  };

  const goToNextStation = () => {
    if (currentStation < TOTAL_STATIONS) {
      setCurrentStation(currentStation + 1);
    } else {
      setCurrentStation(1);
    }
    setCurrentRoundCompleted(false);
  };

  const goToNextRound = () => {
    if (currentRound < TOTAL_ROUNDS) {
      setCurrentRound(currentRound + 1);
      setCurrentStation(1);
      setCurrentRoundCompleted(false);
    } else {
      setGameCompleted(true);
      setShowSaveScorecard(true);  // Show SaveScorecard component
      saveScores();
    }
  };

  const calculateTotalRoundScores = () => {
    const roundTotals = {};
    players.forEach((player) => {
      roundTotals[player] = {};
      for (let round = 1; round <= TOTAL_ROUNDS; round++) {
        let totalRoundScore = 0;
        for (let station = 1; station <= TOTAL_STATIONS; station++) {
          totalRoundScore += parseInt(scores[player]?.[round]?.[station] || 0, 10);
        }
        roundTotals[player][round] = totalRoundScore;
      }
    });
    return roundTotals;
  };

  const calculateTotalScores = (roundTotals) => {
    const totals = {};
    players.forEach((player) => {
      let total = 0;
      for (let round = 1; round <= TOTAL_ROUNDS; round++) {
        total += parseInt(roundTotals[player][round] || 0, 10);
      }
      totals[player] = total;
    });
    return totals;
  };

  const startOver = () => {
    setPlayers([]);
    setPlayerName("");
    setCardCreated(false);
    setCurrentRound(1);
    setCurrentStation(1);
    setScores({});
    setCurrentRoundCompleted(false);
    setGameCompleted(false);
    setDivisions([]);
    setShowSaveScorecard(false);  // Reset visibility of SaveScorecard
  };

  const saveScores = async () => {
    try {
      const roundTotals = calculateTotalRoundScores(); // Calculate round totals
      const totalScores = calculateTotalScores(roundTotals); // Calculate total scores

      const scoresToSave = players.map((player) => {
        const playerScores = {};

        for (let round = 1; round <= TOTAL_ROUNDS; round++) {
          playerScores[round] = {};
          for (let station = 1; station <= TOTAL_STATIONS; station++) {
            playerScores[round][station] = scores[player]?.[round]?.[station] || 0;
          }
        }

        return {
          player,
          division: divisions[players.indexOf(player)],
          roundTotals: roundTotals[player],
          totalScore: totalScores[player],
          scores: playerScores,
        };
      });

      await addDoc(collection(db, "scores"), {
        gameDate: new Date(),
        scores: scoresToSave,
      });

      alert("Scores saved to Firebase!");
    } catch (error) {
      console.error("Error saving scores: ", error);
      alert("Error saving scores to Firebase");
    }
  };

  return (
    <Router>
      <div className="App">
        <Logo />
        <Routes>
          <Route
            path="/"
            element={
              <div>
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
                {!cardCreated && players.length >= 2 && (
                  <button className="create-card-button" onClick={createCard}>
                    Create Card
                  </button>
                )}
                {cardCreated && !gameCompleted && (
                  <div>
                    {!showSaveScorecard && (
                      <RoundStation
                        players={players}
                        divisions={divisions}
                        currentRound={currentRound}
                        currentStation={currentStation}
                        scores={scores}
                        handleScoreChange={handleScoreChange}
                        goToNextStation={goToNextStation}
                      />
                    )}
                  </div>
                )}
                {currentRound <= 2 && currentStation < 5 && currentRoundCompleted && !gameCompleted && (
                  <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <button onClick={goToNextStation} style={{ backgroundColor: "#007bff" }}>
                      Go to Next Station
                    </button>
                  </div>
                )}
                {currentRound <= 2 && currentStation === 5 && currentRoundCompleted && !gameCompleted && (
                  <div style={{ textAlign: "center" }}>
                    <button onClick={goToNextRound} style={{ backgroundColor: "#6dbf57", color: "white" }}>
                      Next Round
                    </button>
                  </div>
                )}
                {currentRound === 3 && currentStation === 5 && currentRoundCompleted && !gameCompleted && !showSaveScorecard && (
                  <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <button onClick={() => setShowSaveScorecard(true)} style={{ backgroundColor: "#ff6f61" }}>
                      Review Scorecard
                    </button>
                  </div>
                )}
                {showSaveScorecard && (
                  <div>
                    <SaveScorecard
                      players={players}
                      totals={calculateTotalScores(calculateTotalRoundScores())}
                      divisions={divisions}
                      saveScores={saveScores}  // Pass the saveScores function as a prop
                    />
                  </div>
                )}
                {cardCreated && !gameCompleted && !showSaveScorecard && (
                  <StartOverButton startOver={startOver} />
                )}
              </div>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
