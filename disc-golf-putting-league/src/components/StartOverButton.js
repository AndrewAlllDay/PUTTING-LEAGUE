import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import "./StartOverButton.css";

const StartOverButton = ({ onStartOver }) => {
  return (
    <div className="start-over-btn-container">
      <button className="start-over-btn" onClick={onStartOver}>
        <FontAwesomeIcon icon={faRedo} />
      </button>
    </div>
  );
};

export default StartOverButton;
