const mongoose = require('mongoose');
// setting up mongoose Schema and model
//schemaType options included
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please write a tour name'],
    unique: true
  },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'tour must include price'] }
});

// convention is to use capital letter to name a model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;