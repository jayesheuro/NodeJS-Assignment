const express = require("express");
const router = express.Router();

// const UserAuth = require("../Services/auth/auth");
const RouteHandler = require("../handlers/userHandler");

router.post("/register", RouteHandler.register);

module.exports = router;
