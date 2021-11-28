const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/config.env` }); // this needs to be declared before app
const app = require('./app6');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connnection succesful!');
  });

// setting up mongoose Schema and model
//schemaType options included
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please write a tour name'],
    unique: true
  },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'tour must include price'] }
});

// convention is to use capital letter to name a model
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The SeaShell Campers',
  rating: 4.6,
  price: 300
});

// the save method returns a promise / for now we'll use the then method
testTour
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log(`ERROR 🛠: ${err}`);
  });

console.log(process.env.NODE_ENV); // eslint-disable-line
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`); // eslint-disable-line
});
