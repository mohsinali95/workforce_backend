var express = require('express');
var router = express.Router();
var userController = require('./user.controller')
var { isUserExists, isNotUserExists } = require("../../middlewares/auth")


router.post('/createMOD', isUserExists, userController.createMOD)
router.post('/createBulkMOD', userController.createBulkMOD)
router.post('/updateProfile', userController.updateProfile)
router.get('/getMOD', userController.getMOD)
router.get('/getAll/:roleId',userController.getAlluser)
router.put('/allowAccess/:userId',userController.updateAllow)
module.exports = router;
