const router = require('express').Router();
const commentsController = require("../../controllers/commentsController");

router 
    .route("/comment") 
    .post(commentsController.addComment)
    .get(commentsController.getComment)

router
    .route("/comment/:searchValue")
    .get(commentsController.getComment)


module.exports = router;