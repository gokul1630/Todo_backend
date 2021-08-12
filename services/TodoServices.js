const Todo = require("../models/TodoModel");

exports.UpdateTodoService = async function (req, res) {
  const { todoId, todo, description } = req.body;

  try {
    const updateTodo = await Todo.findById(todoId);
    (updateTodo.todo = todo), (updateTodo.description = description);
    updateTodo.save();
    res.json(updateTodo);
  } catch (error) {
    res.status(403).send(error.message);
  }
};
exports.completedTodoService = async function (req, res) {
  const {
    todoId,
    pending = false,
    onGoing = false,
    testing = false,
    completed = false,
  } = req.body;
  try {
    const completeTodo = await Todo.findById(todoId);
    (completeTodo.pending = pending),
      (completeTodo.onGoing = onGoing),
      (completeTodo.testing = testing),
      (completeTodo.completed = completed);
    completeTodo.save();
    res.json(completeTodo);
  } catch (error) {
    res.status(403).send(error.message);
  }
};

exports.getOneTodo = async function (req, res) {
  const { todoId } = req.body;
  try {
    const todo = await Todo.findById(todoId);
    res.json(todo);
  } catch (error) {
    res.status(403).send(error.message);
  }
};

exports.DeleteTodo = async function (req, res) {
  const { todoId } = req.body;
  try {
    const todo = await Todo.findByIdAndDelete(todoId);
    res.json(todo);
  } catch (error) {
    res.status(403).send(error.message);
  }
};
