import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN, USER_NEW_PASSWORD_API } from "../../../Constants/constants";
import Button from "../../../Reusable/Button";
import Input from "../../../Reusable/Input";
import { toast } from "react-toastify";
import { validation } from "../../../Utils/validation";
import Card from "../../../Reusable/Card";
import Form from "../../../Reusable/Form";
import { newPasswordFormFields } from "../../../Constants/formFields";

const NewPassword = () => {
  const [form, setForm] = useState(Object.fromEntries(Object.keys(newPasswordFormFields).map((item) => [item, ""])));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const requestToken = location.search.slice(location.search.indexOf("=") + 1);
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      if (form.Password !== form.ConfirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (validation({ password: form.Password })) return;

      const response = await axios.post(
        `${import.meta.env.VITE_API}/${USER_NEW_PASSWORD_API}`,
        { Password: form.Password, ConfirmPassword: form.ConfirmPassword },
        { params: { token: requestToken } }
      );
      if (response?.data?.statusCode !== 200)
        return toast.error(response?.data?.message);
      else toast.success("Successfully changed password");

      setMessage(response.message);
      if (response.status === 200) {
        toast.success(response?.data?.message);
      }
      navigate(LOGIN, { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event, name) => {
    setForm({ ...form, [name]: event.target.value });
  };

  return (
    <Card>
        <p>Set a new password</p>
      {/* <form onSubmit={handleLoginSubmit}>

        <div data-mdb-input-init className="form-outline mb-4">
          <Input
            type={"password"}
            label={"New Password"}
            name={"Password"}
            value={form.Password}
            onChange={(e) => handleInputChange(e, "Password")}
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <Input
            type={"password"}
            label={"Confirm New Password"}
            name={"ConfirmPassword"}
            value={form.ConfirmPassword}
            onChange={(e) => handleInputChange(e, "ConfirmPassword")}
          />
        </div>

      </form> */} 

      <Form formAttribute={newPasswordFormFields} onChange={handleInputChange}/>

        <div className="text-center pt-1 mb-5 pb-1">
          <Button onClick={handleLoginSubmit} prop={"Submit"} />
        </div>
        {message && <p style={{ textAlign: "center" }}>{message}</p>}
    </Card>
  );
};

export default NewPassword;
