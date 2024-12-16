import React from "react";

const NextRoundButton = ({ currentRoundCompleted, currentRound, goToNextRound }) => (
  currentRoundCompleted ? (
    <button className="next-round" onClick={goToNextRound}>
      {currentRound < 3 ? "Next Round" : "Finish Game"}
    </button>
  ) : null
);

export default NextRoundButton;
