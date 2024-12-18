import React, { useState, useEffect } from "react";
import "./RoundStation.css";

const RoundStation = ({
  players,
  divisions,
  currentRound,
  currentStation,
  scores,
  handleScoreChange,
  goToNextStation,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const calculateRunningTotal = (player) => {
    let total = 0;
    for (let station = 1; station <= currentStation; station++) {
      total += parseInt(scores[player]?.[currentRound]?.[station] || 0, 10);
    }
    return total;
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) {
      nextSlide(); // swipe left (next)
    } else if (touchEnd - touchStart > 50) {
      prevSlide(); // swipe right (previous)
    }
  };

  const nextSlide = () => {
    if (currentSlide < players.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const allScoresFilled = () => {
    return players.every(
      (player) =>
        scores[player]?.[currentRound]?.[currentStation] !== undefined &&
        scores[player][currentRound][currentStation] !== ""
    );
  };

  // Reset currentSlide to 0 when a new round or station begins
  useEffect(() => {
    setCurrentSlide(0);
  }, [currentRound, currentStation]);

  if (!players || !divisions || players.length !== divisions.length) {
    return <div className="error-message">Error: Mismatch between players and divisions</div>;
  }

  return (
    <div
      className="round-station-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h2 className="round-header">
        Round {currentRound} - Station {currentStation}
      </h2>

      <div className="slider-container">
        <button
          className="slider-button"
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          &lt;
        </button>

        <div className="player-slider">
          {/* The grid is now controlled by the currentSlide index to only show one player at a time */}
          <div
            className="player-grid"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`, // Moves the player-grid based on currentSlide
              transition: "transform 0.3s ease", // Smooth transition for sliding
            }}
          >
            {players.map((player, index) => (
              <div key={player} className="player-row">
                <span className="player-name">{player}</span>
                <input
                  type="number"
                  className="score-input"
                  value={scores[player]?.[currentRound]?.[currentStation] || ""}
                  onChange={(e) => handleScoreChange(player, e.target.value)}
                  placeholder="Score"
                />
                <span className="running-total">
                  Total: {calculateRunningTotal(player)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          className="slider-button"
          onClick={nextSlide}
          disabled={currentSlide === players.length - 1}
        >
          &gt;
        </button>
      </div>

      {allScoresFilled() && currentStation < 5 && (
        <button className="next-station-button" onClick={goToNextStation}>
          Go to Next Station
        </button>
      )}
    </div>
  );
};

export default RoundStation;
