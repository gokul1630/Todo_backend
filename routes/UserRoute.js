const router=require('express').Router()
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');


router.post('/loginUser', UserController.loginUser);
router.post('/me', auth, UserController.me);
router.put('/signUpUser', UserController.signUpUser);

module.exports = router;
