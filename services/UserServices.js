const User = require('../models/UserModel');
const Todo = require('../models/TodoModel');

exports.findUserService = async function (userId) {
  return await User.findById(userId);
};

exports.SignInService = async function (user) {
  return await User.findOne({ user });
};

exports.SignUpService = async function (user, password) {
  return await User.create({ user, password });
};
exports.DeleteUser = async function (userId) {
  return await User.findByIdAndDelete(userId);
};

exports.AddNewTodo = async function (req, res) {
  let {
    todo,
    description,
    pending = false,
    onGoing = false,
    testing = false,
    completed = false,
    userId,
  } = req.body;
  try {
    const todos = await Todo.create({
      todo,
      description,
      pending,
      completed,
      onGoing,
      testing,
      userId,
    });

    let data = await User.findByIdAndUpdate(userId, {
      $push: { todoList: todos._id },
    });
    if (res) {
      return await res.json(todos);
    }
  } catch (error) {
    res.status(403).send(error.message);
  }
};

exports.getAllTodoService = async function (req, res) {
  const { userId } = req.body;

  try {
    await User.findById(userId)
      .lean()
      .populate('todoList')
      .exec((err, post) => {
        if (post) {
          res.json(post.todoList);
        } else {
          res.status(403).send(err);
        }
      });
  } catch (error) {
    res.status(403).send(error.message);
  }
};
