import React, { useState, useEffect } from "react";
import "./StatTracker.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Menter from "./Menter.js";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { IconButton } from "@material-ui/core";

let a = 0;
const StatTracker = () => {
  // Stats we are managing
  const [distance, setDistance] = useState(0);
  const [wCount, setWCount] = useState({ ws: 0 });
  const [workout, setWorkout] = useState("");
  const [displayWorkoutInfo, setDisplayWorkoutInfo] = useState(false);
  const [circuits, setCircuits] = useState(0);
  const [day, setDay] = useState("");
  const [workoutNotes, setWorkoutNotes] = useState({ note: "" });
  const [typing, setTyping] = useState(false);
  const [workoutInfo, setWorkoutInfo] = useState([]);
  // Stat Handlers
  const handleW = (event) => {
    console.log(`Event: ${event.key}`);
    if (!typing) {
      if (event.key === "w") {
        a = a + 1;
        setWCount({ ws: a });
      } else if (event.key === "n") {
        a = a - 1;
        setWCount({ ws: a });
      }
    }
  };

  document.onkeypress = (event) => {
    event = event || window.event;
    handleW(event);
  };

  const handleWorkoutChange = (event) => {
    console.log(`Workout: ${event.target.value}`);
    setWorkout(event.target.value);
    if (event.target.value >= 1 || event.target.value <= 5) {
      setDisplayWorkoutInfo(true);
    } else {
      setDisplayWorkoutInfo(false);
    }
  };

  const handleDayChange = (event) => {
    console.log(`Day: ${event.target.value}`);
    setDay(event.target.value);
  };

  const handleWorkoutNotes = (event) => {
    setWorkoutNotes(event.target.value);
  };

  // Style select input
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      backgroundColor: "#F50057",
      padding: 3,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  const submitWorkout = () => {
    console.log(`SUBMITTING WORKOuT!`);
    fetch("http://192.168.0.32:5001/api/updateTodo", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((data) => data.text())
      .then((info) => console.log(info));
  };

  useEffect(() => {
    const getUrl = "http://192.168.0.32:5001/api/getWorkout";
    fetch(getUrl)
      .then((data) => {
        return data.text();
      })
      .then((info) => {
        setWorkoutInfo(info.split(","));
      });
  }, []);
  return (
    <div className="stat-tracker">
      <h2>Stat Tracker</h2>
      <p className="w-counter">{wCount.ws}</p>
      <Menter value={distance} setValue={setDistance} units="km" label="Run" />
      <div className="workout-section">
        <FormControl className={classes.formControl}>
          <Select
            labelId="workout-select"
            id="workout-select"
            value={workout}
            onChange={handleWorkoutChange}
          >
            <MenuItem value={1}>Chest</MenuItem>
            <MenuItem value={2}>Arms</MenuItem>
            <MenuItem value={3}>Shoulders</MenuItem>
            <MenuItem value={4}>Back</MenuItem>
            <MenuItem value={5}>Abs</MenuItem>
          </Select>
        </FormControl>
      </div>
      {displayWorkoutInfo && (
        <div className="workout-info">
          <Menter
            value={circuits}
            setValue={setCircuits}
            units="sets"
            label="Circuits"
          />
          <FormControl className={classes.formControl}>
            <Select
              labelId="workout-select"
              id="workout-select"
              value={day}
              onChange={handleDayChange}
            >
              <MenuItem value={1}>Monday</MenuItem>
              <MenuItem value={2}>Tuesday</MenuItem>
              <MenuItem value={3}>Wednesday</MenuItem>
              <MenuItem value={4}>Thursday</MenuItem>
              <MenuItem value={5}>Friday</MenuItem>
              <MenuItem value={6}>Saturday</MenuItem>
              <MenuItem value={7}>Sunday</MenuItem>
            </Select>
          </FormControl>
          <form>
            <input
              type="text"
              placeholder="Enter notes..."
              value={workoutNotes.note}
              onChange={handleWorkoutNotes}
              className="list-input"
              onFocus={() => setTyping(true)}
              onBlur={() => setTyping(false)}
            />
          </form>
          <IconButton className="minus-btn" onClick={submitWorkout}>
            <AddCircleIcon color="secondary" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default StatTracker;
