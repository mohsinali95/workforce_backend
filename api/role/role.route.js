var express = require('express');
var router = express.Router();
var roleController = require('./role.controller')



router.post('/', roleController.create)
router.get('/getAll', roleController.getAll)

module.exports = router;
