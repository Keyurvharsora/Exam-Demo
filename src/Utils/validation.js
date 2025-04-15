import { toast } from "react-toastify";
import { CUSTOM_ID } from "../Constants/constants";

export const validation = ({ name = null, email = null, password = null }) => {
  if (name === "" || email === "" || password === "")
    return toast.error("Please fill all the fields", { toastId: CUSTOM_ID });

  if (name && !/^[A-Za-z]+[A-Za-z ]*$/.test(name))
    return toast.error("Please enter valid name", { toastId: CUSTOM_ID });

  if (
    email &&
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi.test(email)
  )
    return toast.error("Enter a valid email address", { toastId: CUSTOM_ID });

  if (password && !/[a-zA-Z0-9]{6,30}/gi.test(password))
    return toast.error("Enter a valid password", { toastId: CUSTOM_ID });
};