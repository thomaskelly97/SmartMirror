const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const util = require("util");
const cors = require("cors");
var schedule = require("node-schedule");
const readFileAsync = util.promisify(fs.readFile);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.urlencoded());

const PORT = 5001;
app.listen(PORT, () => console.log("Listening on port 5001"));

app.get("/api/getTodo", (req, res) => {
  console.log(`> Requested todo list from /getTodo`);
  fs.readFile("./todo.txt", "utf8", function read(err, data) {
    if (err) {
      throw err;
    }
    res.status(200).send(data);
  });
});

app.post("/api/updateTodo", (req, res) => {
  console.log(`> Updating todo list from /updateTodo`);
  const list = req.body.list;
  fs.writeFile("./todo.txt", list, function (err) {
    if (err) return console.log(err);
  });
  res.send("Successfully updated todo list.");
});

app.get("/api/getWorkout", (req, res) => {
  console.log(`> Requested stats from /getWorkout`);
  fs.readFile("./thisweek.json", "utf8", function read(err, data) {
    if (err) {
      throw err;
    }
    res.status(200).send(data);
  });
});

app.post("/api/updateWorkout", async (req, res) => {
  readFileAsync("./thisweek.json", "utf8", function read(err, data) {
    if (err) {
      throw err;
    }
    const parsedData = JSON.parse(data);
    const squash = {
      ...parsedData,
      ...req.body,
    };
    fs.writeFile("./thisweek.json", JSON.stringify(squash), function (err) {
      if (err) return console.log(err);
    });
    res.send("> > > > POST RECEIVED, UPDATE SUCCESSFUL");
  });
});

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const j = schedule.scheduleJob("8 * * *", function () {
  const day = new Date().getDay();
  console.log(`Triggering scheduled job at ${new Date()}`);

  if (day === 0) {
    // reset this file

    readFileAsync("./thisweek.json", "utf8", function read(err, data) {
      if (err) {
        console.log(err);
      }

      let totalRun = 0;
      let totalMeditate = 0;
      let totalW = 0;
      let totalLegPain = 0;
      let workoutCount = 0;
      let workoutString = "";
      DAYS.map((day) => {
        if (JSON.parse(data)[day]) {
          totalRun = totalRun + JSON.parse(data)[day].run;
          if (JSON.parse(data)[day].meditate) {
            totalMeditate++;
          }
          if (JSON.parse(data)[day].w) {
            totalW++;
          }
          if (JSON.parse(data)[day].legPain) {
            totalLegPain++;
          }
          if (JSON.parse(data)[day].workout.name !== "") {
            workoutCount++;
            workoutString = `${workoutString}${
              JSON.parse(data)[day].workout.name
            }, `;
          }
        }
      });
      const wArray = new Array(totalW).fill("-");
      const summaryString = `${wArray.join(
        ""
      )}\n${workoutCount} Workouts - ${workoutString}\nYou ran ${totalRun}km this week and meditated ${totalMeditate} times.\nLeg pain was experienced ${totalLegPain} times`;

      fs.writeFile("./lastweek.txt", summaryString, function (err) {
        if (err) return console.log(err);
      });
      fs.writeFile("./thisweek.json", JSON.stringify({}), function (err) {
        if (err) return console.log(err);
      });
    });
  }
});
