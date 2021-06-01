const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    username: String,
    title: String, 
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
});

const Comment = mongoose.model('comment', commentSchema);




module.exports = Comment;