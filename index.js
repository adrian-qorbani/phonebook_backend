const express = require("express");
const app = express();
const morgan = require("morgan");

// json-parser middleware to access data easily
// without, body of request is undefined
app.use(express.json());
app.use(morgan(':method :url :body'))

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

// data
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// server routes
app.get("/", (request, response) => {
  response.send("<h1>Hello Server!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  let startTime = new Date();
  response.send(
    `<h1>Phonebook has ${persons.length} entries.</h1><br/><h2>${startTime}</h2>`
  );
  // response.send('hello, world!')
});

// generate random ids for entries
const generateId = () => {
  return Math.floor(Math.random() * (999 - 100 + 1) + 100);
};

// entry add (POST)
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name parameter is missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "number parameter is missing",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  

  persons = persons.concat(person);
  response.json(person);
});

// entry delete request
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  // response with 204 for deletion
  response.status(204).end();
});

// port and
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
