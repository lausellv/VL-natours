const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const { create } = require('domain');

const app = express();

// 1) MIDDLEWARES

app.use(morgan('dev'));
app.use(express.json()); // middleware is added to express (ie express json)

// we can create our own middleware function
app.use((req, res, next) => {
  console.log('hello from the middleware 😁');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(`requestedAt: ${req.requestTime}`);
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`) // no problem running this code here bc it's non-blocking
);

// 2) ROUTE HANDLERS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours /*cld be tourNumber . I decide the key value*/: tours },
  }); // ES6 we don't need to specify key and value if they have the same name
};

const createTour = (req, res) => {
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

const getTour = (req, res) => {
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

const updateTour = (req, res) => {
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

const deleteTour = (req, res) => {
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

const getAllUsers = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'this route is not defined yet!' });
};

const getUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'this route is not defined yet!' });
};

const createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'this route is not defined yet!' });
};

const updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'this route is not defined yet!' });
};

const deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'this route is not defined yet!' });
};

// 3) ROUTES

//app.get('/api/v1/tours', getAllTours);
//app.post('/api/v1/tours', createTour );
//app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
const tourRouter = express.Router();
const userRouter = express.Router();


app.use('/api/v1/tours', tourRouter);
tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

app.use('/api/v1/users', userRouter);
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

// 4) SERVER

const PORT = 3000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`listening on port ${PORT}...`);
});
