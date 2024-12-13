import React from 'react';

function SaveScorecardButton() {
  const handleSave = () => {
    // Add logic to save the scorecard here
    console.log("Scorecard saved!");
  };

  return <button onClick={handleSave}>Save Scorecard</button>;
}

export default SaveScorecardButton;
