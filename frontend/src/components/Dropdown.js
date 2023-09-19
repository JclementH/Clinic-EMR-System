import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { map } from "lodash";
import { useState } from "react";
import { TEETH_BLUE, TEETH_GRAY, TEETH_GREEN, TEETH_RED, TEETH_YELLOW } from "./Constant";

function Dropdown({ teethColor, dispatchType, handleChange }) {

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Change</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={teethColor}
        label="Change"
        onChange={e => handleChange(e, dispatchType)}
      >
        <MenuItem value={TEETH_RED}>Red</MenuItem>
        <MenuItem value={TEETH_GREEN}>Green</MenuItem>
        <MenuItem value={TEETH_BLUE}>Blue</MenuItem>
        <MenuItem value={TEETH_YELLOW}>Yellow</MenuItem>
        <MenuItem value={TEETH_GRAY}>Gray</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Dropdown;
