import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import './../components/CSS/button.css'

const Button = ({ prop, onClick, icon = null }) => {
  
  return (
    <>
      <button
        type="submit"
        className={icon ?  "button log-out" : "button"}
        onClick={onClick}
      >
        {icon === "LogOut" && <LogoutIcon/>}&nbsp;{prop}
      </button>
    </>
    );
};

export default Button;
