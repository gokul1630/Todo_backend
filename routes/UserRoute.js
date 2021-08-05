const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/', UserController.post_new_user);
router.delete('/', UserController.delete_delete_user);

module.exports = router;
