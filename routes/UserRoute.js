const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/loginUser', UserController.post_signin_user);
router.put('/signUpUser', UserController.post_new_user);
router.delete('/deleteUser', UserController.delete_delete_user);

module.exports = router;
