const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://mahdigh:${password}@phonebookcluster.5wdycvx.mongodb.net/?retryWrites=true&w=majority`;

const contactName = process.argv[3];
const contactNumber = process.argv[4];

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: 'Ebi',
//   number: '938-178-1550',
// })

// Check for number of arguments given in CLI
// less than 5 displays database entries, then exits.
if (process.argv.length < 5) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
    process.exit(1);
  });
}

const person = new Person({
  name: contactName,
  number: contactNumber,
});

// Five arguments given, commits new person, with
// name and number being 4th and 5th args respectively.
person.save().then((result) => {
  console.log(
    `added ${contactName} with number ${contactNumber} to phonebook.`
  );
  mongoose.connection.close();
});