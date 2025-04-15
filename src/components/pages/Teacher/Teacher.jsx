import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, TEACHER_DASHBOARD } from "../../../Constants/constants";

const sidebar = ["Dashboard", "StudentList", "Profile"];
const Teacher = () => {
  const [selected, setSelected] = useState();
  const navigate = useNavigate();

  const clickHandler = (element) => {
    setSelected(element);
    if (element !== "Dashboard") {
      navigate(`${TEACHER_DASHBOARD}/${element}`);
    } else {
      navigate(TEACHER_DASHBOARD);
    }
  };
  return (
    <>
      <div style={{ display: "flex", height: "100vh" }}>
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
export default Teacher;
