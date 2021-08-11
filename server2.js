const dotenv = require('dotenv');

dotenv.config({path: `${__dirname}/config.env`})  // this needs to be declared before app
const app = require('./app6');



console.log(process.env.NODE_ENV); // eslint-disable-line 

const PORT = (process.env.PORT || 3000);

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`); // eslint-disable-line 
});
