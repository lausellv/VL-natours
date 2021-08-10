const express = require('express');
const {getUsers, createUser, getUser, updateUser, deleteUser} = require(`${__dirname}/../controllers/userController2`);
const router = express.Router();


router
  .route('/')
  .get(getUsers)
  .post(createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

  module.exports = router;

  
// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
// );

// const getUsers = (req, res) => {
//   res.status(200).json({
//     status: 'success', // required json header
//     requestedAt: req.requestTime,
//     results: users.length, // this is not a required json header
//     data: { users } //could be just tours ES6
//   });
// };

// const createUser = (req, res) => {
//   res
//     .status(500)
//     .json({ status: 'error', message: 'this route does not exist yet' });
// };

// const getUser = (req, res) => {
//   console.log(req.params.id);
//   const id = req.params.id; // to convert the string to a an integer. Number(req.params.id)

//   const user = users.find(el => el._id === id);
//   if (!user) {
//     return res.status(404).json({ status: 'fail', message: 'invalid id' });
//   }
//   res.status(200).json({
//     status: 'success',
//     data: { user }
//   });
// };

// const updateUser = (req, res) => {
//   res
//     .status(500)
//     .json({ status: 'error', message: 'this route does not exist yet' });
// };

// const deleteUser = (req, res) => {
//   res
//     .status(500)
//     .json({ status: 'error', message: 'this route does not exist yet' });
// };
