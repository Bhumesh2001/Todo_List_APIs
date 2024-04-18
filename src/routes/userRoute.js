const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateToUser } = require('../middlewares/validateUser');

router.post('/register', validateToUser, userController.registerUser);
router.post('/login', passport.authenticate('local'), userController.loginUser);

module.exports = router;