const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Watchlist = new Schema({
    symbol: String,
});

const Watchlist = mongoose.model('watchlist', Watchlist);

module.exports = Watchlist; 