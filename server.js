const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path:'./config.env'})
console.log(process.env);
const PORT = 3000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`listening on port ${PORT}...`);
});
