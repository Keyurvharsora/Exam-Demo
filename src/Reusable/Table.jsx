import React from "react";

const Table = ({ theadKeyMap, tbodyValueMap, buttonAttributes = null }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            {theadKeyMap?.map((value, index) => (
              <th key={index}>{value}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            {tbodyValueMap?.map(([key, value]) => {
                if(value === "studentAnswer") return;
                if(theadKeyMap.includes(key)) return (
                    <td>{value}</td>
                )
            }
                         
            
            //   return (
            //     <tr key={index}>
            //       {Object.values(value.Result[0]).map((values, index) => {
            //         return <td key={index}>{values}</td>;
            //       })}
            //     </tr>
            //   );
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
