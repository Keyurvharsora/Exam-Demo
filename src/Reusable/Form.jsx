import React from "react";
import Input from "./Input";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Form = ({ formAttribute, onChange }) => {
  return (
    <>
      <form>
        {Object.entries(formAttribute).map(([key, value]) => (
          <div className="form-outline mb-4" key={key}>
            {value.type === "select" ? (
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id={key}
                  value={formAttribute[key].value}
                  onChange={(e) => onChange(e, key)}
                >
                  {value.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Input
                type={value.type}
                name={key}
                label={value.label}
                value={formAttribute[key].value}
                onChange={(e) => onChange(e, key)}
              />
            )}
          </div>
        ))}
      </form>
    </>
  );
};

export default Form;
