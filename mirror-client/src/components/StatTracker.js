import React, { useState, useEffect } from "react";
import "./StatTracker.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Menter from "./Menter.js";
import { IconButton } from "@material-ui/core";
import DisplayStats from "./DisplayStats";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Checkbox from "@material-ui/core/Checkbox";
import TelegramIcon from "@material-ui/icons/Telegram";
import AirlineSeatLegroomNormalIcon from "@material-ui/icons/AirlineSeatLegroomNormal";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import InvertColorsOffIcon from "@material-ui/icons/InvertColorsOff";

const StatTracker = () => {
  // Stats we are managing
  const [distance, setDistance] = useState(0);
  const [w, setW] = useState(false);
  const [workout, setWorkout] = useState("");
  const [displayWorkoutInfo, setDisplayWorkoutInfo] = useState(false);
  const [day, setDay] = useState("");
  const [workoutNotes, setWorkoutNotes] = useState("");
  const [meditate, setMeditate] = useState(false);
  const [dailyNote, setDailyNote] = useState("");
  const [legPain, setLegPain] = useState(false);
  const [workoutInfo, setWorkoutInfo] = useState({});

  const getUrl = "http://localhost:5001/api/getWorkout";

  // STYLES
  const useStyles = makeStyles((theme) => ({
    // formControl: {
    //   margin: theme.spacing(1),
    //   minWidth: 120,
    //   backgroundColor: "#F50057",
    //   padding: 3,
    // },
    // selectEmpty: {
    //   marginTop: theme.spacing(2),
    // },
    root: {
      //flexGrow: 1,
    },
    paper: {
      height: 300,
      width: 200,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  // Stat Handlers
  const handleWorkoutChange = (event) => {
    setWorkout(event.target.value);
    if (typeof event.target.value === "string") {
      setDisplayWorkoutInfo(true);
    } else {
      setDisplayWorkoutInfo(false);
    }
  };
  const handleW = (event) => {
    setW(!w);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleWorkoutNotes = (event) => {
    setWorkoutNotes(event.target.value);
  };

  const handleDailyNotes = (event) => {
    setDailyNote(event.target.value);
  };

  const handleMedChange = () => {
    setMeditate(!meditate);
  };

  const handlePainChange = () => {
    setLegPain(!legPain);
  };

  const submitTodayStats = () => {
    if (day === "") {
      return null;
    }
    fetch("http://localhost:5001/api/updateWorkout", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [day]: {
          run: distance,
          workout: {
            name: workout,
            note: workoutNotes,
          },
          w: w,
          meditate: meditate,
          dailyNote: dailyNote,
          legPain: legPain,
        },
      }),
    })
      .then((data) => data.text())
      .then((info) => console.log(info));

    fetch(getUrl)
      .then((data) => {
        return data.json();
      })
      .then((info) => {
        setWorkoutInfo(info);
      });
  };

  useEffect(() => {
    fetch(getUrl)
      .then((data) => {
        return data.json();
      })
      .then((info) => {
        setWorkoutInfo(info);
      });
  }, []);
  console.log(`Day is: ${day}`);
  return (
    <div>
      <div className="stat-tracker">
        <h2>Stat Tracker</h2>
        {/* START OF DAY SECTION  */}
        <div className="days-radio-group">
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="day"
              name="day"
              value={day}
              onChange={handleDayChange}
              className="day-buttons"
            >
              <FormControlLabel
                value="Monday"
                control={<Radio color="primary" />}
                label="Monday"
              />
              <FormControlLabel
                value="Tuesday"
                control={<Radio color="primary" />}
                label="Tuesday"
              />
              <FormControlLabel
                value="Wednesday"
                control={<Radio color="primary" />}
                label="Wednesday"
              />
              <FormControlLabel
                value="Thursday"
                control={<Radio color="primary" />}
                label="Thursday"
              />
              <FormControlLabel
                value="Friday"
                control={<Radio color="primary" />}
                label="Friday"
              />
              <FormControlLabel
                value="Saturday"
                control={<Radio color="primary" />}
                label="Saturday"
              />
              <FormControlLabel
                value="Sunday"
                control={<Radio color="primary" />}
                label="Sunday"
              />
            </RadioGroup>
          </FormControl>
        </div>
        {/* END OF DAY SECTION  */}

        {/* START OF CENTRAL SECTION */}
        <div className="stat-central-section">
          <form>
            <input
              type="text"
              placeholder="Enter daily notes..."
              value={dailyNote}
              onChange={handleDailyNotes}
              className="list-input"
            />
          </form>
          <Menter
            value={distance}
            setValue={setDistance}
            units="km"
            label="Run"
          />
          <div className="workout-section">
            <FormControl className="workout-selector">
              <Select
                labelId="workout-select"
                id="workout-select"
                value={workout}
                onChange={handleWorkoutChange}
              >
                <MenuItem value={"Chest"}>Chest</MenuItem>
                <MenuItem value={"Arms"}>Arms</MenuItem>
                <MenuItem value={"Shoulders"}>Shoulders</MenuItem>
                <MenuItem value={"Back"}>Back</MenuItem>
                <MenuItem value={"Abs"}>Abs</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="workout-notes">
            <form>
              <input
                type="text"
                placeholder="Enter workout notes..."
                value={workoutNotes.note}
                onChange={handleWorkoutNotes}
                className="list-input"
              />
            </form>
          </div>
        </div>
        {/* END OF CENTRAL SECTION */}

        <div className="icon-selectors">
          <FormControlLabel
            control={
              <Checkbox
                icon={<SentimentSatisfiedIcon color="primary" />}
                checkedIcon={<SentimentVerySatisfiedIcon color="secondary" />}
                name="checkedH"
                onChange={handleMedChange}
              />
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                icon={<AirlineSeatLegroomNormalIcon color="primary" />}
                checkedIcon={<AirlineSeatLegroomNormalIcon color="secondary" />}
                name="checkedH"
                onChange={handlePainChange}
              />
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                icon={<InvertColorsOffIcon color="primary" />}
                checkedIcon={<InvertColorsIcon color="secondary" />}
                name="checkedH"
                onChange={handleW}
              />
            }
          />
          <IconButton className="minus-btn" onClick={submitTodayStats}>
            <TelegramIcon color="secondary" />
          </IconButton>
        </div>
      </div>
      <DisplayStats info={workoutInfo} classes={classes} selDay={day} />
    </div>
  );
};

export default StatTracker;
