var express = require('express');
var router = express.Router();
var authRoutes = require("../api/auth/auth.route")
var industryRoutes = require("../api/Industry/industry.route")
var userRoutes = require("../api/User/user.route")
var placeRoutes = require("../api/Place/place.route")
var roleRoutes = require("../api/role/role.route")
var taskRoutes = require("../api/Task/task.route")

router.use("/auth",authRoutes)
router.use("/industry",industryRoutes)
router.use("/user",userRoutes)
router.use("/place",placeRoutes)
router.use("/role",roleRoutes)
router.use("/task",taskRoutes)

module.exports = router;
