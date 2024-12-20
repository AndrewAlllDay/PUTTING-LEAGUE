import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import "./StartOverButton.css";

const StartOverButton = ({ startOver }) => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleClick = () => {
    setShowModal(true); // Show modal when button is clicked
  };

  const handleConfirm = () => {
    startOver(); // Call startOver function if confirmed
    setShowModal(false); // Close modal after confirmation
  };

  const handleCancel = () => {
    setShowModal(false); // Close modal if canceled
  };

  return (
    <div className="start-over-btn-container">
      <button className="start-over-btn" onClick={handleClick}>
        <FontAwesomeIcon icon={faRedo} />
      </button>

      {showModal && (
        <div className="modal-container">
          <div className="modal">
            <p>Are you sure you want to start over?</p>
            <div className="modal-buttons">
              <button className="modal-btn confirm" onClick={handleConfirm}>Yes</button>
              <button className="modal-btn cancel" onClick={handleCancel}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartOverButton;
