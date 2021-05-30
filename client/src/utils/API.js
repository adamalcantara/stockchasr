import axios from "axios";
const ApiKey = 'd8fc6a7a05fe981d498316ed91194d9d';
const polyApi = 'ed_5Kc2Wrznyf4U8Upim_3pyVBqDKnXS';

export default {
  findStock: function (searchValue) {
    // return axios.get("https://api.marketstack.com/v1/intraday?access_key=" + ApiKey + "&symbols=" + searchValue + "&interval=1min");
    return axios.get("https://api.marketstack.com/v1/eod?access_key=" + ApiKey + "&symbols=" + searchValue + "&date_from=2000-05-20&date_to=2021-05-30&limit=365")
  },
  findInfo: function (searchValue) {
    return axios.get("https://api.polygon.io/v1/meta/symbols/" + searchValue + "/company?&apiKey=" + polyApi);
  
  },
  getWatchlist: function () {
    return axios.get('/api/users/watchlist')
  },
  addToWatchlist: function (stock) {
    // safeguards from sending empty request to the backend
    if (!Object.keys(stock).length){
      return;
    }
    return axios.post('/api/users/watchlist', stock)
  },
  findNews: function(searchValue) {
    return axios.get('https://api.polygon.io/v2/reference/news?limit=1&order=descending&sort=published_utc&ticker=' + searchValue + '&published_utc.gte=2021-04-26&apiKey=' + polyApi)
  }
};

