var express = require('express');
var router = express.Router();
var authController = require('./auth.controller')
var { isUserEmailVerified, isNotUserExists } = require("../../middlewares/auth")



router.post('/register', authController.register)
router.post('/login', isNotUserExists, isUserEmailVerified, authController.login)
router.get('/verifyUser', authController.verifyUser)

router.post('/forgotPassword', isNotUserExists,authController.forgotPassword)

module.exports = router;
