import React from "react";
import ResetPassword from "../auth/ResetPassword";
import { useNavigate } from "react-router-dom";
import Button from "../../../Reusable/Button";
import "../../CSS/button.css";

const Profile = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <>
      <h1>Profile Page</h1>
      
      <Button
        className="log-out"
        prop={"Log Out"}
        icon={"LogOut"}
        onClick={handleLogOut}
      />

      <ResetPassword />
    </>
  );
};

export default Profile;
