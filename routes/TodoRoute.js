const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/TodoController');

router.post('/getAllTodo', TodoController.get_all_todos);
router.post('/findOneTodo', TodoController.get_one_todo);
router.put('/postNewTodo', TodoController.post_new_todo);
router.patch('/updateTodo', TodoController.update_todo);
router.delete('/deleteTodo', TodoController.delete_todo);

module.exports = router;
