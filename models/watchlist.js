const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Watchlist = new Schema({
    symbol: String,
});

module.exports = mongoose.model('watchlist', Watchlist);