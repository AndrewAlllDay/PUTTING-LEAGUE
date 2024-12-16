// components/NextStationButton.js
import React from "react";

const NextStationButton = ({ allScoresFilled, currentStation, goToNextStation }) => (
  allScoresFilled && currentStation < 5 ? (
    <button onClick={goToNextStation}>Next Station</button>
  ) : null
);

export default NextStationButton;
