import React from "react";

const RoundStation = ({
  players,
  currentRound,
  currentStation,
  scores,
  handleScoreChange,
  goToNextStation,
}) => {
  // Function to calculate running total for a player (resets after each round)
  const calculateRunningTotal = (player) => {
    let total = 0;
    // Only sum the scores for the current round
    for (let station = 1; station <= currentStation; station++) {
      total += parseInt(scores[player]?.[currentRound]?.[station] || 0, 10);
    }
    return total;
  };

  // Function to check if all scores for the current station are filled
  const allScoresFilled = () => {
    return players.every(
      (player) =>
        scores[player]?.[currentRound]?.[currentStation] !== undefined &&
        scores[player][currentRound][currentStation] !== ""
    );
  };

  return (
    <div>
      <h2 className="RoundStation">
        Round {currentRound} - Station {currentStation}
      </h2>

      {/* Player Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {players.map((player) => (
          <div
            key={player}
            style={{
              padding: "10px",
              borderRadius: "5px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* Flex Row for Name and Input */}
            <div
              style={{
                display: "flex",
                alignItems: "center", // Align horizontally
                marginBottom: "10px",
                justifyContent: "space-between"
              }}
            >
              {/* Player Name (25%) */}
              <div
                style={{
                  flex: "0 0 25%",
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  paddingRight: "10px",
                }}
              >
                {player}
              </div>

              {/* Score Input (75%) */}
              <div style={{ flex: "0 0 60%" }}>
                <input
                  type="number"
                  value={
                    scores[player]?.[currentRound]?.[currentStation] || ""
                  }
                  onChange={(e) => handleScoreChange(player, e.target.value)}
                  style={{
                    width: "100%",
                    textAlign: "start",
                    fontSize: "1.2em",
                    padding: "5px",
                  }}
                />
              </div>
            </div>

            {/* Running Total */}
            < div
              style={{
                textAlign: "center",
                fontSize: "1.1em",
              }}
            >
              <strong>Total:</strong> {calculateRunningTotal(player)}
            </div>
          </div>
        ))
        }
      </div >

      {/* Next Station Button */}
      {
        currentStation < 5 && allScoresFilled() && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button onClick={goToNextStation}>Next Station</button>
          </div>
        )
      }
    </div >
  );
};

export default RoundStation;
