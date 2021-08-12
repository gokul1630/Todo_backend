const Todo = require('../models/TodoModel');
const {
  UpdateTodoService,
  completedTodoService,
  getOneTodo,
  DeleteTodo,
} = require('../services/TodoServices');
const { AddNewTodo, getAllTodoService } = require('../services/UserServices');

const getAllTodo = async (req, res) => {
  return await getAllTodoService(req, res);
};

const findOneTodo = async (req, res) => {
  return await getOneTodo(req, res);
};

const postNewTodo = async (req, res) => {
  AddNewTodo(req, res);
};

const updateTodo = async (req, res) => {
  return await UpdateTodoService(req, res);
};

const updateCompletedTodo = async (req, res) => {
  return await completedTodoService(req, res);
};
const deleteTodo = async (req, res) => {
  return await DeleteTodo(req, res);
};

module.exports = {
  getAllTodo,
  findOneTodo,
  postNewTodo,
  updateTodo,
  updateCompletedTodo,
  deleteTodo,
};
