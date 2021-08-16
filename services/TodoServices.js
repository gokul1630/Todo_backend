const Todo = require('../models/TodoModel');

exports.updateTodoService = async function (todoId) {
  return await Todo.findById(todoId);
};
exports.deleteTodo = async function (todoId) {
  return await Todo.findByIdAndDelete(todoId);
};
