const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log('hello from the middleware 😀');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();  // this is the middleware
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getTours = (req, res) => {
 
  res.status(200).json({
    status: 'success', // required json header
    requestedAt: req.requestTime,
    results: tours.length, // this is not a required json header
    data: { tours } //could be just tours ES6
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; // to convert the string to a an integer. Number(req.params.id)

  const tour = tours.find(el => el.id === id);
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'invalid id' });
  }
  res.status(200).json({
    status: 'success',
    data: { tour }
  });
};

const createTour = (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'invalid id' });
  }
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<updated tour here>' } });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(tour => tour.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  const index = tours.indexOf(tour);
  tours.splice(index, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res
        .status(204)
        .json({ status: 'success', data: null, message: 'deleted' });
    }
  );
};

app
  .route('/api/v1/tours')
  .get(getTours)
  .post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
