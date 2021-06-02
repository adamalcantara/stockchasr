const path = require("path");
const router = require("express").Router();
const userRoutes = require("./users");
const commentRoutes = require("./comments")

//User Routes
router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
// For anything else, render the html page
module.exports = router;
