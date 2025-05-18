const express = require("express")
const cookie = require("cookie")
const logoutRoute = express.Router()

logoutRoute.get("/", (req, res) => {
    console.log("loged out")
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "Strict",
        path: "/", // Default path unless otherwise specified
    });
    res.status(200).send({ message: "Logged out" });

})

module.exports = logoutRoute