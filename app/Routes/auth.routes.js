var express = require('express');
var router = express.Router();

let authController = require("../controllers/auth.controller")
router.get("/", authController.index);
router.post("/login", authController.login);
router.post("/register", authController.register);
module.exports = router;