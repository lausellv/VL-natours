const express = require('express');
const tourController = require('./../controllers/tourControllers')

const router = express.Router();

//this is part of the middleware stack of the tourRouter 'app'
router.param('id', tourController.checkID);
router.route('/').get(tourController.getAllTours).post(tourController.checkBody, tourController.createTour);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router; 