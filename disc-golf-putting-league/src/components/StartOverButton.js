import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import "./StartOverButton.css";

const StartOverButton = ({ startOver }) => { // Use startOver as the prop name
  return (
    <div className="start-over-btn-container">
      <button className="start-over-btn" onClick={startOver}> {/* Call startOver */}
        <FontAwesomeIcon icon={faRedo} />
      </button>
    </div>
  );
};

export default StartOverButton;
