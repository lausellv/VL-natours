const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json()); // middlewar is added to express

// app.get('/', (req, res) => {
//   res
//     .status(200)  // default status
//     .json({ message: 'Hello from the server side', app: 'Natours' });
// });

// app.post('/', (req, res)=>{
//   res.send('you can post to this endpoint')
// })
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`) // no problem running this code here bc it's non-blocking
);

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours: tours } });
});

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;// another way of converting a string to a number is to multiply a string by the number 1
  const tour = tours.find(el => el.id === id)// variables defined in the url are in params

  //if (id > tours.length)
  if (!tour)
   {
    return res.status(404).json({status : 'fail',
    message: 'invalid id'
  })
  } 
  res
    .status(200)
    .json({ status: 'success', 
    data: { tour}   // same as tour:tour
  });
});

app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);

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
});

const PORT = 3000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`listening on port ${PORT}...`);
});
