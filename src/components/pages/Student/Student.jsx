import React, { useState } from "react";
import { STUDENT_DASHBOARD } from "../../../Constants/constants";
import { Outlet, useNavigate } from "react-router-dom";
import "../../CSS/student.css";

const sidebar = ["Dashboard", "Profile"];

const Student = () => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const clickHandler = (content) => {
    setSelected(content);
    if (content !== "Dashboard") {
      navigate(`${STUDENT_DASHBOARD}/${content}`);
    } else {
      navigate(STUDENT_DASHBOARD);
    }
  };

  return (
    <>
      <div className="d-flex" style={{height: "100vh"}}>
        <div className="sidebar">
          {sidebar.map((item) => (
            <p
              key={item}
              onClick={() => clickHandler(item)}
              style={{
                cursor: "pointer",
                color: selected === item ? "#b50c00" : "black",
              }}
            >
              {item}
            </p>
          ))}
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Student;
