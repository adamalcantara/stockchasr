const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    username: String,
    stock: String, 
    comments: String,
});





module.exports = mongoose.model('comments', commentSchema);