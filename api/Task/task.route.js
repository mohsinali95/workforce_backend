var express = require('express');
var router = express.Router();
var taskController = require('./task.controller')



router.post('/', taskController.create)
// router.post('/markTask', taskController.markTask)
router.post('/createBulk', taskController.bulkTask)
router.get('/getShowTasks', taskController.getShowTasks)
router.get('/getAlltask',taskController.getTaskByDate)
module.exports = router;
