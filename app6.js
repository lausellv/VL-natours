const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require(`${__dirname}/routes/tourRoutes2`);
const userRouter = require(`${__dirname}/routes/userRoutes2`);

//MIDDLEWARES
if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log('hello from the middleware 😀');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); // this is the middleware
  next();
});

//MOUNTING ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;

//START SERVER
// const PORT = 3000;

// app.listen(PORT, () => {
//   console.log(`app running on port ${PORT}`);
// });

// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
// );

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );

//  HANDLERS

// const getUsers = (req, res) => {
//   res.status(200).json({
//     status: 'success', // required json header
//     requestedAt: req.requestTime,
//     results: users.length, // this is not a required json header
//     data: { users } //could be just tours ES6
//   });
// };

// const createUser = (req, res) => {
//   res
//     .status(500)
//     .json({ status: 'error', message: 'this route does not exist yet' });
// };

// const getUser = (req, res) => {
//   console.log(req.params.id);
//   const id = req.params.id; // to convert the string to a an integer. Number(req.params.id)

//   const user = users.find(el => el._id === id);
//   if (!user) {
//     return res.status(404).json({ status: 'fail', message: 'invalid id' });
//   }
//   res.status(200).json({
//     status: 'success',
//     data: { user }
//   });
// };

// const updateUser = (req, res) => {
//   res
//     .status(500)
//     .json({ status: 'error', message: 'this route does not exist yet' });
// };

// const deleteUser = (req, res) => {
//   res
//     .status(500)
//     .json({ status: 'error', message: 'this route does not exist yet' });
// };

// const getTours = (req, res) => {
//   res.status(200).json({
//     status: 'success', // required json header
//     requestedAt: req.requestTime,
//     results: tours.length, // this is not a required json header
//     data: { tours } //could be just tours ES6
//   });
// };

// const getTour = (req, res) => {
//   console.log(req.params);
//   const id = req.params.id * 1; // to convert the string to a an integer. Number(req.params.id)

//   const tour = tours.find(el => el.id === id);
//   if (!tour) {
//     return res.status(404).json({ status: 'fail', message: 'invalid id' });
//   }
//   res.status(200).json({
//     status: 'success',
//     data: { tour }
//   });
// };

// const createTour = (req, res) => {
//   console.log(req.body);
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);
//   tours.push(newTour);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     err => {
//       res.status(201).json({ status: 'success', data: { tour: newTour } });
//     }
//   );
// };

// const updateTour = (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({ status: 'fail', message: 'invalid id' });
//   }
//   res
//     .status(200)
//     .json({ status: 'success', data: { tour: '<updated tour here>' } });
// };

// const deleteTour = (req, res) => {
//   const id = req.params.id * 1;
//   const tour = tours.find(tour => tour.id === id);
//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID'
//     });
//   }
//   const index = tours.indexOf(tour);
//   tours.splice(index, 1);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     err => {
//       res
//         .status(204)
//         .json({ status: 'success', data: null, message: 'deleted' });
//     }
//   );
// };

//ROUTES

// const tourRouter = express.Router();
// tourRouter
//   .route('/')
//   .get(getTours)
//   .post(createTour);
// tourRouter
//   .route('/:id')
//   .get(getTour)
//   .patch(updateTour)
//   .delete(deleteTour);

// const userRouter = express.Router();
// userRouter
//   .route('/')
//   .get(getUsers)
//   .post(createUser);
// userRouter
//   .route('/:id')
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);
