import axios from "axios";
import React, { useState } from "react";
import {
  ACCESS_TOKEN,
  LOGIN,
  USER_RESET_PASSWORD_API,
} from "../../../Constants/constants";
import Input from "../../../Reusable/Input";
import Button from "../../../Reusable/Button";
import { toast } from "react-toastify";
import { validation } from "../../../Utils/validation";
import Card from "../../../Reusable/Card";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const ResetPassword = () => {
  const [resetPassword, setResetPassword] = useState({
    Password: "",
    oldPassword: "",
    ConfirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    if (resetPassword.Password !== resetPassword.ConfirmPassword)
      return toast.error("Password does not match");

    if (validation({ password: resetPassword.Password })) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/${USER_RESET_PASSWORD_API}`,
        {
          oldPassword: resetPassword.oldPassword,
          Password: resetPassword.Password,
          ConfirmPassword: resetPassword.ConfirmPassword,
        },
        { headers: { "access-token": localStorage.getItem("token") } }
      );
      if (response?.data?.statusCode === 200)
        toast.success(response?.data?.message);
      else return toast.error(response?.data?.message);

      navigate(LOGIN, { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (event, name) => {
    setResetPassword({ ...resetPassword, [name]: event.target.value });
  };
  return (
    <>
      <Card>
        <h2 className="h4 mb-5 text-center">Reset Password Form</h2>

        <form onSubmit={handleResetSubmit}>
          <div className="col-12 form-floating mb-3">
            <Input
              type={"password"}
              label={"Old Password"}
              name={"oldPassword"}
              value={resetPassword.oldPassword}
              onChange={(e) => handlePasswordChange(e, "oldPassword")}
            />
          </div>
          <div className="col-12 form-floating mb-3">
            <Input
              type={"password"}
              label={"Password"}
              name={"password"}
              value={resetPassword.Password}
              onChange={(e) => handlePasswordChange(e, "Password")}
            />
          </div>
          <div className="col-12 form-floating mb-3">
            <Input
              type={"password"}
              label={"Confirm Password"}
              name={"ConfirmPassword"}
              value={resetPassword.ConfirmPassword}
              onChange={(e) => handlePasswordChange(e, "ConfirmPassword")}
            />
          </div>
          <div className="text-center pt-1 mb-5 pb-1">
            <Button
              prop={
                loading ? (
                  <span className="login-button">
                    <CircularProgress size={15} color="white" /> Submit
                  </span>
                ) : (
                  "Submit"
                )
              }
            />
          </div>
        </form>
      </Card>
    </>
  );
};

export default ResetPassword;
