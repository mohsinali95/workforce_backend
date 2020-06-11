var express = require('express');
var router = express.Router();
var industryController = require('./industry.controller')



router.post('/', industryController.create)
router.get('/', industryController.get)

module.exports = router;
