const router = require('express').Router()
const TodoController = require('../controllers/TodoController')

router.post('/getAllTodo', TodoController.getAllTodo)
router.put('/postNewTodo', TodoController.postNewTodo)
router.patch('/updateTodo', TodoController.updateTodo)
router.delete('/deleteTodo', TodoController.deleteTodos)

module.exports = router
