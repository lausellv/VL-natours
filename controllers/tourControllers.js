const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours /*cld be tourNumber . I decide the key value*/: tours },
  }); // ES6 we don't need to specify key and value if they have the same name
};

exports.createTour = (req, res) => {
  console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res
        .status(201) // 201 means created
        .json({ status: 'success', data: { tour: newTour } });
    }
  );
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; // another way of converting a string to a number is to multiply a string by the number 1
  const tour = tours.find((el) => el.id === id); // variables defined in the url are in params

  // if there is no mathing id const tour wld end up undefined
  //if (id > tours.length)
  if (!tour) {
    return res
      .status(404)
      .json({ status: 'fail', message: `tour ${id} does not exist` });
  }
  res.status(200).json({
    status: 'success',
    data: { tour }, // same as tour:tour
  });
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1; // another way of converting a string to a number is to multiply a string by the number 1
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res
      .status(404)
      .json({ status: 'failed', message: `Tour ${id} does not exist` });
  }

  const updatedTour = Object.assign(tour, req.body);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res
        .status(201) // 201 means created
        .json({ status: 'success', data: { tour: updatedTour } });
    }
  );
};

exports.deleteTour = (req, res) => {
  const id = parseInt(req.params.id); // another way of converting a string to a number is to multiply a string by the number 1
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res
      .status(404)
      .json({ status: 'failed', message: `Tour ${id} does not exist` });
  }

  const updatedTours = tours.filter((el) => el.id !== tour.id);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      return res
        .status(204) // 204 means deleted
        .json({ status: 'success', message: `Tour ${id} was deleted ` });
    }
  );
};