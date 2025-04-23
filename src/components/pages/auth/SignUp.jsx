import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN, USER_SIGNUP_API } from "../../../Constants/constants";
import { CircularProgress } from "@mui/material";
import Button from "../../../Reusable/Button";
import { toast } from "react-toastify";
import { validation } from "../../../Utils/validation";
import Card from "../../../Reusable/Card";
import Form from "../../../Reusable/Form";
import { signupFormFields } from "../../../Constants/formFields";

const SignUp = () => {
  const [inputs, setInputs] = useState(
    Object.fromEntries(Object.keys(signupFormFields).map((item) => [item, ""]))
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    if (validation(inputs)) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/${USER_SIGNUP_API}`,
        { ...inputs }
      );

      if (response?.data?.statusCode === 200)
        toast.success(response?.data?.message);
      else return toast.error(response?.data?.message);

      navigate(LOGIN);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (event, name) => {
    setInputs({ ...inputs, [name]: event.target.value });
  };

  return (
    <>
      <Card>
        <h2 className="h4 mb-5 text-center">Sign Up Form</h2>

        {/* <form onSubmit={handleSubmit}>
          <div className="row gy-3 ">
            <div className="col-12 form-floating">
              <Input
                type={"text"}
                label={"Name"}
                name={"name"}
                value={inputs.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </div>

            <div className="col-12 form-floating">
              <Input
                type={"email"}
                label={"Email"}
                name={"email"}
                value={inputs.email}
                onChange={(e) => handleInputChange(e, "email")}
              />
            </div>
            <div className="col-12 form-floating">
              <Input
                type={"password"}
                label={"Password"}
                name={"password"}
                value={inputs.password}
                onChange={(e) => handleInputChange(e, "password")}
              />
            </div>

            <div className="col-12">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="role"
                  value={inputs.role}
                  onChange={(e) => handleInputChange(e, "role")}
                >
                  <MenuItem value={"student"}>Student</MenuItem>
                  <MenuItem value={"teacher"}>Teacher</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </form> */}
        <Form formAttribute={signupFormFields} onChange={handleInputChange} />
        <div className="bottom">
          <Button
            onClick={handleSubmit}
            prop={
              loading ? (
                <span className="login-button">
                  <CircularProgress size={15} color="white" /> Sign Up
                </span>
              ) : (
                "Sign Up"
              )
            }
          />
        </div>

        <p className="m-0 text-secondary text-center">
          Already have an account?{" "}
          <Link to={LOGIN} className="link-primary text-decoration-underline">
            Login
          </Link>
        </p>
      </Card>
    </>
  );
};

export default SignUp;
