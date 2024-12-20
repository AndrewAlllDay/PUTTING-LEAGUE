import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [scorecards, setScorecards] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Helper function to get today's date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Convert Firestore Timestamp to YYYY-MM-DD
  const convertTimestampToDate = (timestamp) => {
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchScorecards = async () => {
      try {
        const scoresCollection = collection(db, "scores");
        const scoresSnapshot = await getDocs(scoresCollection);

        const scorecardsList = scoresSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const todayDate = getCurrentDate();
        console.log("Today's Date:", todayDate);

        const divisionScores = {};
        scorecardsList.forEach((scorecard) => {
          const gameDate =
            scorecard.gameDate instanceof Timestamp
              ? convertTimestampToDate(scorecard.gameDate)
              : scorecard.gameDate;

          console.log("Game Date:", gameDate);

          if (gameDate === todayDate) {
            scorecard.scores.forEach((score) => {
              const { player, division, totalScore } = score; // Use totalScore directly
              const total = totalScore; // No need to parse

              if (!divisionScores[division]) {
                divisionScores[division] = [];
              }

              divisionScores[division].push({
                player,
                total,
              });
            });
          }
        });

        console.log("Filtered Divisions:", divisionScores);

        // Sort scores within each division
        Object.keys(divisionScores).forEach((division) => {
          divisionScores[division].sort((a, b) => b.total - a.total);
        });

        setScorecards(divisionScores);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching scorecards: ", error);
        setLoading(false);
      }
    };

    fetchScorecards();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="text-center">Today's Results</h2>
      {loading ? (
        <p className="loading">Loading scores...</p>
      ) : (
        <div className="tables-container">
          {Object.keys(scorecards).length === 0 ? (
            <p>No scores submitted yet for today.</p>
          ) : (
            Object.keys(scorecards)
              .sort((a, b) => a.localeCompare(b))
              .map((division) => (
                <div key={division} className="division-table">
                  <h3>{division} Division</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>Total Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scorecards[division].map((score, index) => (
                        <tr key={index}>
                          <td>{score.player}</td>
                          <td>{score.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
          )}
        </div>
      )}
      <button className="home-button" onClick={() => navigate("/")}>Create a Card</button>
    </div>
  );
};

export default Dashboard;
