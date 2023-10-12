require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

// json-parser middleware to access data easily
// without, body of request is undefined
app.use(express.json());
app.use(morgan(":method :url :body"));
app.use(cors());
app.use(express.static("dist"));

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});


// server routes
app.get("/", (request, response) => {
  response.send("<h1>Hello Server!</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
