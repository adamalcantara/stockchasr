const { Comment, Account} = require("../models/")

module.exports = {
    addComment: function(req, res) {
        console.log("And you can tell everybody, this is your song.")
        console.log(req.body)
        Comment.create(req.body)
        .then((data)=> {
            console.log("Come with me, and you'll be, in a world of pure imagination");
            console.log(data);
            // return Account.findOneAndUpdate(
            //     {_id: req.session.user_id},
            //     { $addToSet: { comment; data } },
            //     { new: true }
            // );
        })
        .catch((err)=> {
            console.log(err);
            res.json(err);
        });
        res
        .status(200)
        .send("Then say you'll share with me one love, one lifetime");
    },
    getComment: function(req, res) {
        console.log("They there teenage baltimore! Don't change that channel, cause it's time for the Corny Collins Show!")
        console.log(req.params.searchValue)
        Comment.find({stock: req.params.searchValue})
        .then(data => {
            console.log("There were bells on a hill, but I never heard them ringing. No I never heard them at all, till there was you")
            console.log(data)
			res.json(data)
		}) .catch (err => {
			console.log(err)
			res.json(err)
		})
    },
};