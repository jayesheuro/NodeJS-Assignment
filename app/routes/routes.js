const express = require("express");
const router = express.Router();

const RouteHandler = require("../handlers/userHandler");
const authentication = require("../auth");
router.post("/register", RouteHandler.register);
router.post("/login", RouteHandler.login);
router.get("/get-all", [authentication.verifyToken], RouteHandler.getAllUsers);
router.get("/:id", [authentication.verifyToken], RouteHandler.getUserById);
router.put("/:id", [authentication.verifyToken], RouteHandler.updateUserById);
router.delete(
  "/:id",
  [authentication.verifyToken],
  RouteHandler.deleteUserById
);
router.put(
  "/:id/changepassword",
  [authentication.verifyToken],
  RouteHandler.updateUserPassword
);
module.exports = router;
