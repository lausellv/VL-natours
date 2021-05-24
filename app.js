const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require ('./routes/userRoutes');
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



// 3) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) SERVER

const PORT = 3000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`listening on port ${PORT}...`);
});
