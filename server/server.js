const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const util = require("util");
const cors = require("cors");

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
  console.log(`> GET TODO`);
  fs.readFile("./todo.txt", "utf8", function read(err, data) {
    console.log(`> > Attempting to read file`);
    if (err) {
      throw err;
    }
    console.log(`> > > Data read from file: ${data}`);
    res.status(200).send(data);
  });
});

app.post("/api/updateTodo", (req, res) => {
  console.log(`> POST TODO`);
  console.log(`>> BODY: ${JSON.stringify(req.body)}`);
  const list = req.body.list;
  console.log(`> > LIST FROM REQUEST BODY: ${JSON.stringify(list)}`);
  fs.writeFile("./todo.txt", list, function (err) {
    if (err) return console.log(err);
    console.log(`> > > Writing to file`);
  });
  // write this to the file
  res.send("> > > > POST RECEIVED, UPDATE SUCCESSFUL");
});

app.get("/api/getWorkout", (req, res) => {
  console.log(`> GET WORKOUT`);
  fs.readFile("./workout.txt", "utf8", function read(err, data) {
    console.log(`> > > Attempting to read workout file`);
    if (err) {
      throw err;
    }
    console.log(`> > > Data read from file ${data}`);
    res.status(200).send(data);
  });
});

app.post("/api/updateWorkout", (req, res) => {
  console.log(`> POST TODO`);
  console.log(`>> BODY: ${JSON.stringify(req.body)}`);
  const list = req.body.list;
  console.log(`> > LIST FROM REQUEST BODY: ${JSON.stringify(list)}`);
  fs.writeFile("./workout.txt", list, function (err) {
    if (err) return console.log(err);
    console.log(`> > > Writing to file`);
  });
  // write this to the file
  res.send("> > > > POST RECEIVED, UPDATE SUCCESSFUL");
});
