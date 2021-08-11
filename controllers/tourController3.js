const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'invalid ID' });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

exports.getTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success', // required json header
    requestedAt: req.requestTime,
    results: tours.length, // this is not a required json header
    data: { tours } //could be just tours ES6
  });
};

exports.getTour = (req, res) => {
  //console.log(req.params);
  const id = req.params.id * 1; // to convert the string to a an integer. Number(req.params.id)

  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: { tour }
  });
};

exports.createTour = (req, res) => {
  //console.log(req.body);
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

exports.updateTour = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<updated tour here>' } });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(tour => tour.id === id);

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
