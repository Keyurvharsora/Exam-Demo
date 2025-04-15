import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Input = ({ type, name, label, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <TextField
        variant="filled"
        margin="normal"
        size="small"
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        name={name}
        id={name}
        label={label}
        value={value}
        onChange={onChange}
        InputProps={
          type === "password" && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }
        }
        fullWidth
      />
    </>
  );
};

export default Input;
