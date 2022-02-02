const express = require("express");
const router = express.Router();

const RouteHandler = require("../handlers/userHandler");
const authentication = require("../auth");
router.post("/register", RouteHandler.register);
router.post("/login", RouteHandler.login);
router.get("/all", [authentication.verifyToken], RouteHandler.getAllUsers);

module.exports = router;
