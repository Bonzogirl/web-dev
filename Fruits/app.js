const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB'),
  { userNewUrlParser: true };

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model('Fruit', fruitSchema);

const fruit = new Fruit({
  name: 'Apple',
  score: 8,
  review: 'great',
});
// fruit.save();

const PersonSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema,
});
const Person = mongoose.model('Person', PersonSchema);

const pineapple = new Fruit({
  name: 'Pineapple',
  score: 9,
  review: "ohuenno ochen'!",
});
// pineapple.save();

const person = new Person({
  name: 'Liya',
  age: 23,
  favoriteFruit: pineapple,
});
// person.save();

const kiwi = new Fruit({
  name: 'Kiwi',
  score: 6,
  review: 'sour',
});
// kiwi.save();

// Person.updateOne({ name: 'Mike' }, { favoriteFruit: kiwi }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('complete');
//   }
// });
