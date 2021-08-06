const Todo = require('../models/TodoModel');
const User = require('../models/UserModel');

const get_all_todos = (req, res) => {
  const { userId } = req.body;
  User.findById(userId)
    .populate('todoList')
    .exec((err, post) => res.json(post.todoList));
};

const get_one_todo = (req, res) => {
  const { todoId } = req.body;
  Todo.findById(todoId)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json(err.message));
};

const post_new_todo = async (req, res) => {
  const { todo, completed, userId } = req.body;
  let data = await Todo.create({ todo, completed, userId });
  await User.findByIdAndUpdate(userId, {
    $push: { todoList: data._id },
  });
  res.json(data);
};

const update_todo = async (req, res) => {
  const { todoId, completed, todo } = req.body;
  Todo.findById(todoId).then((response) => {
    (response.todo = todo), (response.completed = completed);

    response
      .save()
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json(err.message));
  });
};
const delete_todo = (req, res) => {
  const { todoId } = req.body;
  Todo.findByIdAndDelete(todoId)
    .then(() => res.json('Todo Deleted'))
    .catch((err) => res.status(400).json(err.message));
};

module.exports = {
  get_all_todos,
  get_one_todo,
  post_new_todo,
  update_todo,
  delete_todo,
};
