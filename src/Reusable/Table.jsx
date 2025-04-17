import React from "react";

const Table = ({ headers, data }) => {
  return (
    <>
      <div className="student-table">
        <table>
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th key={i}>{header}</th>
              ))}
            </tr>
          </thead>

          
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {headers.map((header, i) => (
                  <td key={i}>{row[header]}</td>
                ))}
              </tr>
            ))}
            {data?.length === 0 && <p className="not-found">No Result Found</p>}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
