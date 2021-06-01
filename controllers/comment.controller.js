const { comment } = require("../models");
const withAuth = require('../../utils/auth');

module.exports = {
    postComment: function (req, res) {
        console.log("This is the comment post route");
        comment.create(req.body)
        .then (data => {
            console.log('this is the comment data log')
            return Account.findOneAndUpdate({_id: req.session.user_id}, {$addToSet: {comment: data}}, {new:true} )
        })
        .catch (err => {
            console.log(err)
            res.json(err)
        })
        res.status(200).send("We have a comment everybody")
    }
}


