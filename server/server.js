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
    console.log(`> > Attempting to read file`);
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
    console.log(`Data: ${data} type ${typeof data}`);
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

const j = schedule.scheduleJob("8 * * *", function () {
  console.log(`It's 8am, checking day.`);
  const day = new Date().getDay();
  if (day === 0) {
    console.log(
      `It's Sunday. Transferring this week's logs into lastweek.json and cleaning out this week's.`
    );
  }
});
