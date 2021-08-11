const dotenv = require('dotenv');
const app = require('./app6');

dotenv.config({path: `${__dirname}/config.env`})

console.log(process.env);

const PORT = (process.env.PORT || 3000);

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
