const router = require('express').Router();
const commentsController = require("../../controllers/commentsController");

router 
    .route("/comment")
    .post(commentsController.addComment)
    .get(commentsController.getComments)


module.exports = router;