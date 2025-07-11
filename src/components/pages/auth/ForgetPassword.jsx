import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN, USER_FORGOT_PASSWORD_API } from "../../../Constants/constants";
import { toast } from "react-toastify";
import { validation } from "../../../Utils/validation";
import Card from "../../../Reusable/Card";
import "../../CSS/button.css";
import Form from "../../../Reusable/Form";
import { forgotPasswordFormFields } from "../../../Constants/formFields";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgetSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    if (validation(email)) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/${USER_FORGOT_PASSWORD_API}`,
        { email }
      );

      if (response?.data?.statusCode !== 200)
        return toast.error(response?.data?.message);
      else toast.success(response?.data?.message);

      navigate(LOGIN);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div>
        <div className="forget-page">
          <div className="h2 text-black">Password Reset</div>
          <hr />
          <div className="card-body px-5">
            <p className="card-text py-2">
              Enter your email address and we'll send you an email with
              instructions to reset your password.
            </p>
          </div>
        </div>
      </div>
      {/* <form action="" onSubmit={handleForgetSubmit}>
        <div className="form-outline">
          <input
            type="email"
            id="email"
            placeholder="Email address"
            className="form-control my-3"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </form> */}

      <Form formAttribute={forgotPasswordFormFields} onChange={(e) => setEmail(e.target.value)}/>

      <div style={{ textAlign: "center" }}>
      <button className="reset-button" onClick={handleForgetSubmit}>
        Reset password
      </button>
      </div>
    </Card>
  );
};

export default ForgetPassword;
