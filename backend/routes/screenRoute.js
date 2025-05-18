const express = require("express");
const getScreens = require("../controller/getScreen");
const screenRoute = express.Router();

screenRoute.get("/", getScreens);

module.exports = screenRoute;