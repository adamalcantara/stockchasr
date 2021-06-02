const { Comment, Account} = require("../models/")

module.exports = {
    addComment: function(req, res) {
        console.log("They there teenage baltimore!")
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
    getComments: function(req, res) {
        console.log("They there teenage baltimore!")

        Comment.find()
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
};