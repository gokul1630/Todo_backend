const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/TodoController');

router.get('/', TodoController.get_all_todos);
router.get('/findOne', TodoController.get_one_todo);
router.post('/', TodoController.post_new_todo);
router.patch('/', TodoController.update_todo);
router.delete('/', TodoController.delete_todo);

module.exports = router;
