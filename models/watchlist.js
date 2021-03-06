const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
    symbol: String,
    close: Number,
    high: Number,
    low: Number
});

const Watchlist = mongoose.model('watchlist', watchlistSchema);

module.exports = Watchlist; 