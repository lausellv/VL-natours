
const fs = require('fs');


const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getUsers = (req, res) => {
  res.status(200).json({
    status: 'success', // required json header
    requestedAt: req.requestTime,
    results: users.length, // this is not a required json header
    data: { users } //could be just tours ES6
  });
};

exports.createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'this route does not exist yet' });
};

exports.getUser = (req, res) => {
  console.log(req.params.id);
  const id = req.params.id; // to convert the string to a an integer. Number(req.params.id)

  const user = users.find(el => el._id === id);
  if (!user) {
    return res.status(404).json({ status: 'fail', message: 'invalid id' });
  }
  res.status(200).json({
    status: 'success',
    data: { user }
  });
};

exports.updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'this route does not exist yet' });
};

exports.deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'this route does not exist yet' });
};