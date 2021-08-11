const User = require('../models/UserModel');
const Todo = require('../models/TodoModel');

const loginUser = async (req, res, next) => {
  const { user, password } = req.body;

  if (!user || !password) {
    res.status(403).send({
      message: 'Please provide email and password',
    });
  }

  let users = await User.findOne({ user });
  if (!users) {
    res.status(400).send({ message: "Email isn't registred yet" });
  }
  const match = users.checkPassword(password);

  if (!match) {
    res.status(403).send({ message: "Password doesn't match" });
  }
  let token = users.getToken();
  res.status(200).json({ token: token });
};

const signUpUser = async (req, res) => {
  const { user, password } = req.body;
  let data = await User.create({ user, password });
  let token = data.getToken();
  res.json({ token: token });
};

const me = async (req, res) => {
  const data = req.user;
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
    res.status(403).send({ message: 'something went wrong' });
  }
};

module.exports = {
  loginUser,
  me,
  signUpUser,
  deleteUser,
};
