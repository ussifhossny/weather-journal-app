// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, () => {
  console.log("Server is running...");
  console.log(`http://localhost:${port}`);
});

// receive from client & add Data to projectData
app.post("/postData", (req, res) => {
  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.feeling = req.body.feeling;
});

// Response to the client side with data
app.get("/getData", (req, res) => {
  res.send(projectData);
});
