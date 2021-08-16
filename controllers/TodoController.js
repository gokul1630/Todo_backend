const { updateTodoService, deleteTodo } = require('../services/TodoServices');
const { addNewTodo, getAllTodoService } = require('../services/UserServices');

const getAllTodo = async (req, res) => {
  const { userId } = req.body;
  try {
    const todos = await getAllTodoService(userId);
    if (todos) {
      res.json(todos.todoList);
    }
  } catch (error) {
    res.status(403).send(error.message);
  }
};

const postNewTodo = async (req, res) => {
  let {
    todo,
    description,
    pending = false,
    onGoing = false,
    testing = false,
    completed = false,
    userId,
  } = req.body;
  const todos = await addNewTodo({
    todo,
    description,
    pending,
    completed,
    onGoing,
    testing,
    userId,
  });
  try {
    if (todos) {
      res.json(todos);
    }
  } catch (error) {
    res.status(403).send(error.message);
  }
};

const updateTodo = async (req, res) => {
  const {
    todo,
    description,
    todoId,
    pending = false,
    onGoing = false,
    testing = false,
    completed = false,
  } = req.body;

  try {
    const completeTodo = await updateTodoService(todoId);
    if (todo && description) {
      (completeTodo.todo = todo), (completeTodo.description = description);
    }
    if (pending || onGoing || testing || completed) {
      (completeTodo.pending = pending),
        (completeTodo.onGoing = onGoing),
        (completeTodo.testing = testing),
        (completeTodo.completed = completed);
    }
    completeTodo.save();
    res.json(completeTodo);
  } catch (error) {
    console.log(error);
    res.status(403).send(error.message);
  }
};

const deleteTodos = async (req, res) => {
  const { todoId } = req.body;
  try {
    const todo = await deleteTodo(todoId);
    res.json(todo);
  } catch (error) {
    res.status(403).send(error.message);
  }
};

module.exports = {
  getAllTodo,
  postNewTodo,
  updateTodo,
  deleteTodos,
};
