const path = require("path");
const router = require("express").Router();
const userRoutes = require("./users");

//User Routes
router.use("/users", userRoutes);
// For anything else, render the html page
module.exports = router;
