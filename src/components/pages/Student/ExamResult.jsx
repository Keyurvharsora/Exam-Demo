import React from "react";
import { useLocation } from "react-router-dom";

const ExamResult = () => {
  const location = useLocation();
  const results = location.state || {};
  console.log("result", results);

  const calculatePercentage = (score) => {
    return ((score / 7) * 100).toFixed(2);
  };

  return (
    <>
      <h1>Exam Result</h1>
      <div className="flex">
        <table id="resultTable">
          <tbody>
            <tr>
              <th>Subject:</th>
              <td>{results[0]?.subjectName || "None"}</td>
            </tr>
            <tr>
              <th>Score:</th>
              <td>{results[0]?.score || 0} / 7</td>
            </tr>
            <tr>
              <th>Percentage:</th>
              <td>{calculatePercentage(results[0]?.score) || 0}</td>
            </tr>
            <tr>
              <th>Rank:</th>
              <td>{results[0]?.rank || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExamResult;
