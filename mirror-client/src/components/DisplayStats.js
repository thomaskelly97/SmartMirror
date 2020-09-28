import React from "react";
import "./DisplayStats.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CheckIcon from "@material-ui/icons/Check";
import AirlineSeatLegroomNormalIcon from "@material-ui/icons/AirlineSeatLegroomNormal";
import InvertColorsIcon from "@material-ui/icons/InvertColors";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const DisplayStats = ({ info, classes, selDay }) => {
  console.log(`Info : ${JSON.stringify(info)}`);
  console.log(`INFO: ${JSON.stringify(info["Monday"])}`);
  return (
    <div className="workout-summary">
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {DAYS.map((day) => (
              <Grid key={day} item>
                <Paper
                  className={classes.paper}
                  variant={day === selDay ? "outlined" : undefined}
                  elevation={day === selDay ? 10 : 0}
                >
                  <div className="title">
                    <hr></hr>
                    <p className="title-p">
                      <b>{day}</b>
                    </p>
                    {info[day] && info[day].w && (
                      <InvertColorsIcon
                        color="secondary"
                        className="title-icon"
                      />
                    )}
                    {info[day] && info[day].legPain && (
                      <AirlineSeatLegroomNormalIcon
                        color="secondary"
                        className="title-icon"
                      />
                    )}
                    <br />
                    <hr></hr>
                  </div>
                  {info[day] && info[day].run !== 0 && (
                    <p>{info[day].run}km run</p>
                  )}
                  <div className="meditate">
                    {info[day] && info[day].meditate && <p>Meditated</p>}
                    {info[day] && info[day].meditate && (
                      <CheckIcon color="secondary" className="check-icon" />
                    )}
                  </div>
                  <div className="workout">
                    {info[day] && info[day].workout.name !== "" && (
                      <p>{info[day].workout.name} workout</p>
                    )}
                    {info[day] && info[day].workout.note !== "" && (
                      <p> • {info[day].workout.note}</p>
                    )}
                  </div>
                  {info[day] && info[day].dailyNote !== "" && (
                    <div className="daily-notes">
                      <p>{info[day].dailyNote}</p>
                    </div>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DisplayStats;
