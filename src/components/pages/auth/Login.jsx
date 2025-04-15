import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FORGOT_PASSWORD,
  SIGNUP,
  STUDENT_DASHBOARD,
  TEACHER_DASHBOARD,
  USER_LOGIN_API,
} from "../../../Constants/constants";
import "../../CSS/auth.css";
import Input from "../../../Reusable/Input";
import Button from "../../../Reusable/Button";
import { toast } from "react-toastify";
import { validation } from "../../../Utils/validation";
import Card from "../../../Reusable/Card";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const [formAction, setFormAction] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    if (validation({ email: formAction.email, password: formAction.password }))
      return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/${USER_LOGIN_API}`,
        { email: formAction.email, password: formAction.password }
      );

      if (response?.data?.statusCode === 200)
        toast.success("Login Successfully");
      else toast.error(response?.data?.message);

      const token = response?.data?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        response?.data?.data?.role === "teacher"
          ? navigate(TEACHER_DASHBOARD, { replace: true })
          : navigate(STUDENT_DASHBOARD, { replace: true });
      }
      console.log("Login Side", response.data);
    } catch (error) {
      console.log("inValid", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event, name) => {
    setFormAction({ ...formAction, [name]: event.target.value });
  };

  return (
    <>
      <Card>
        <form className="form" onSubmit={handleLoginSubmit}>
          <h5>Please login to your account</h5>
          <div className="form-outline mb-4">
            <Input
              type={"text"}
              name={"email"}
              label={"Email"}
              value={formAction.email}
              onChange={(e) => handleInputChange(e, "email")}
            />
          </div>

          <div className="form-outline mb-4">
            <Input
              type={"password"}
              name={"password"}
              label={"Password"}
              value={formAction.password}
              onChange={(e) => handleInputChange(e, "password")}
            />
          </div>
          <div className="bottom">
            <Button
              prop={
                loading ? (
                  <span className="login-button">
                    <CircularProgress size={15} color="white" /> Log In
                  </span>
                ) : (
                  "Log In"
                )
              }
            />
            <br />
            <Link className="link" to={FORGOT_PASSWORD}>
              Forgot password?
            </Link>
          </div>

          <div className="flex pb-3" >
            <p className="mb-0 me-2">Don't have an account?</p>
            <Link to={SIGNUP}>SignUp</Link>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Login;
