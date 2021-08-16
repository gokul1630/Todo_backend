const User = require('../models/UserModel');
const Todo = require('../models/TodoModel');

exports.findUserService = async function (userId) {
  return await User.findById(userId);
};

exports.signInService = async function (user) {
  return await User.findOne({ user });
};

exports.signUpService = async function (user, password) {
  return await User.create({ user, password });
};

exports.addNewTodo = async function ({
  todo,
  description,
  pending,
  completed,
  onGoing,
  testing,
  userId,
}) {
  const todos = await Todo.create({
    todo,
    description,
    pending,
    completed,
    onGoing,
    testing,
    userId,
  });

  await User.findByIdAndUpdate(userId, {
    $push: { todoList: todos._id },
  });
  return todo;
};

exports.getAllTodoService = async function (userId) {
  return await User.findById(userId).lean().populate('todoList').exec();
};
