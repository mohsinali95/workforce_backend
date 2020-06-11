var express = require('express');
var router = express.Router();
var placeController = require('./place.controller')


router.post('/', placeController.create)
router.post('/createBulk', placeController.bulkCreate)
router.get('/', placeController.get)

module.exports = router;
