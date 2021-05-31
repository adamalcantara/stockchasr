const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
    symbol: String,
    ceo: String,
});

const Watchlist = mongoose.model('watchlist', watchlistSchema);

module.exports = Watchlist; 