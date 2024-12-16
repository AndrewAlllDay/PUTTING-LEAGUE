// components/NextRoundButton.js
import React from "react";

const NextRoundButton = ({ currentRoundCompleted, currentRound, goToNextRound }) => (
  currentRoundCompleted && currentRound < 3 ? (
    <button onClick={goToNextRound}>Next Round</button>
  ) : null
);

export default NextRoundButton;
