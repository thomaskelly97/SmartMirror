import React from "react";
import { IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Minimize } from "@material-ui/icons";
import "./StatTracker.css";

const Menter = ({ value, setValue, units, label }) => {
  const handleIncrement = (event) => {
    event.preventDefault();
    console.log(`Dist is: ${value}\n We want to increment it to ${value + 1}`);
    setValue(value + 1);
  };
  const handleDecrement = (event) => {
    event.preventDefault();
    console.log(`Dist is: ${value}\n We want to decrement it to ${value - 1}`);
    setValue(value - 1);
  };
  return (
    <div className="run-distance-input">
      <IconButton className="minus-btn" onClick={handleDecrement}>
        <Minimize color="secondary" />
      </IconButton>
      <p className="distance-km">
        {label} • {value}
      </p>
      <p className="w-counter">{units}</p>
      <IconButton className="add-btn" onClick={handleIncrement}>
        <Add color="secondary" />
      </IconButton>
    </div>
  );
};

export default Menter;
