const Express = require("express");
const loginRoute = Express.Router();
const { loginUser } = require("../controller/authController");

loginRoute.post("/", loginUser);

module.exports = loginRoute;
