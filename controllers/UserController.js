const User = require('../models/UserModel');
const Todo = require('../models/TodoModel');

const loginUser = async (req, res) => {
  const { user, password } = req.body;
  let users = await User.findOne({ user, password });
  if (!users) {
    res.status(404).send("user isn't registred yet");
  } else {
    res.json(users);
  }
};

const signUpUser = async (req, res) => {
  const { user, password } = req.body;
  let data = await User.create({ user, password });
  res.json(data);
};
const deleteUser = async (req, res) => {
  const { userId } = req.body;
  let user = await User.findByIdAndDelete(userId);
  let todo = await Todo.find({ userId });
  if (user || todo) {
    todo.forEach((documents) => documents.remove());
    res.json('user deleted');
  } else {
    res.json('something wentt wrong');
  }
};

module.exports = {
  loginUser,
  signUpUser,
  deleteUser,
};
