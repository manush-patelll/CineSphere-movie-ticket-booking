const express = require("express");
const { registerUser } = require("../controller/authController");

const routers = express.Router();

routers.post("/", registerUser);

module.exports = routers;
