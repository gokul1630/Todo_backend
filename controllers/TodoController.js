const Todo = require('../models/TodoModel');
const User = require('../models/UserModel');

const getAllTodo = (req, res) => {
  const { userId } = req.body;
  User.findById(userId)
    .populate('todoList')
    .exec((err, post) => res.json(post.todoList));
};

const findOneTodo = (req, res) => {
  const { todoId } = req.body;
  Todo.findById(todoId)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json(err.message));
};

const postNewTodo = async (req, res) => {
  const {
    todo,
    description,
    pending = false,
    onGoing = false,
    testing = false,
    completed = false,
    userId,
  } = req.body;
  let data = await Todo.create({
    todo,
    description,
    pending,
    completed,
    onGoing,
    testing,
    userId,
  });
  await User.findByIdAndUpdate(userId, {
    $push: { todoList: data._id },
  });
  res.json(data);
};

const updateTodo = (req, res) => {
  const { todoId, todo, description } = req.body;
  Todo.findById(todoId).then((response) => {
    (response.todo = todo), (response.description = description);
    response
      .save()
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json(err.message));
  });
};

const updateCompletedTodo = (req, res) => {
  const {
    todoId,
    pending = false,
    onGoing = false,
    testing = false,
    completed = false,
  } = req.body;
  Todo.findById(todoId).then((response) => {
    (response.pending = pending),
      (response.onGoing = onGoing),
      (response.testing = testing);
    (response.completed = completed),
      response
        .save()
        .then((response) => res.json(response))
        .catch((err) => res.status(400).json(err.message));
  });
};
const deleteTodo = (req, res) => {
  const { todoId } = req.body;
  Todo.findByIdAndDelete(todoId)
    .then(() => res.json('Todo Deleted'))
    .catch((err) => res.status(400).json(err.message));
};

module.exports = {
  getAllTodo,
  findOneTodo,
  postNewTodo,
  updateTodo,
  updateCompletedTodo,
  deleteTodo,
};
