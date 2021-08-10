const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/TodoController');

router.post('/getAllTodo', TodoController.getAllTodo);
router.post('/findOneTodo', TodoController.findOneTodo);
router.put('/postNewTodo', TodoController.postNewTodo);
router.patch('/updateTodo', TodoController.updateTodo);
router.patch('/updateCompletedTodo', TodoController.updateCompletedTodo);
router.delete('/deleteTodo', TodoController.deleteTodo);

module.exports = router;
