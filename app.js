const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require ('./routes/userRoutes');
const { create } = require('domain');

const app = express();

// 1) MIDDLEWAREs
if (process.env.NODE_ENV === 'development'){app.use(morgan('dev'));}

app.use(express.json()); // middleware is added to express (ie express json)
app.use(express.static(`${__dirname}/public`));
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
// this is where we mount our routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
