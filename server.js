const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})
const app = require('./app');

// console.log(process.env);
const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`listening on port ${PORT}...`);
});
