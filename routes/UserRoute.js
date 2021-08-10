const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/loginUser', UserController.loginUser);
router.put('/signUpUser', UserController.signUpUser);
router.delete('/deleteUser', UserController.deleteUser);

module.exports = router;
