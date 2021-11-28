const Tour = require('./../models/tourModel');

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price'
//     });
//   }
//   next();
// };

exports.getTours = async (req, res) => {

  try{ const tours = await Tour.find()
    res.status(200).json({
      status: 'success', // required json header
      // requestedAt: req.requestTime,
      results: tours.length, // this is not a required json header
      data: { tours } //could be just tours ES6
    });
  
  } catch (err){
    res.status(404).json({status: "fail", message : err})
  }

};

exports.getTour = async (req, res) => {
 try {
   const tour = await Tour.findById(req.params.id);
   //same as === Tour.findOne({_id: req.params.id})

   res.status(200).json({
    status: 'success',
    data: { tour }
  });
  } catch (err){
    res.status(404).json({status: "fail", message : err})
  }



  
};

exports.createTour = async (req, res) => {
  try {
    // const newTours = new Tour({
    //   newTour.save()
    const newTour = await Tour.create(req.body);

    //console.log(req.body);
    res.status(201).json({
      status: 'success',
      data: { tour: newTour }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: "invalid data sent" });
  }
};

//patch method
exports.updateTour = async (req, res) => {
  try{
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {new: true,
    runValidators: true});
    res
    .status(200)
    .json({ status: 'success', data: { tour: tour} });

  } catch (err) {
    res.status(400).json({ status: 'fail', message: "invalid data sent" });
  }
  
};

exports.deleteTour = async (req, res) => {

  try {
 await Tour.findByIdAndDelete(req.params.id)

    res.status(204).json({ status: 'success', data: null, message: 'deleted' });
  }catch (err) {
    res.status(404).json({ status: 'fail', message: "invalid data sent" });
  }
  
};
