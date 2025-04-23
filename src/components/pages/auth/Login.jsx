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
import Form from "../../../Reusable/Form";
import { loginFormFields } from "../../../Constants/formFields";

const Login = () => {
  const [formAction, setFormAction] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    if (validation(formAction)) return;

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

        navigate(
          response?.data?.data?.role === "teacher"
            ? TEACHER_DASHBOARD
            : STUDENT_DASHBOARD,
          { replace: true }
        );
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
        <h5>Please login to your account</h5>
        {/* <form className="form" onSubmit={handleLoginSubmit}>
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
        </form> */}

        <Form formAttribute={loginFormFields} onChange={handleInputChange} />
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
            onClick={handleLoginSubmit}
          />
          <br />
          <Link className="link" to={FORGOT_PASSWORD}>
            Forgot password?
          </Link>
        </div>

        <div className="flex pb-3">
          <p className="mb-0 me-2">Don't have an account?</p>
          <Link to={SIGNUP}>SignUp</Link>
        </div>
      </Card>
    </>
  );
};

export default Login;
