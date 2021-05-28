import axios from "axios";
const APIkey = 'd8fc6a7a05fe981d498316ed91194d9d'

export default {
  findStock: function (searchValue) {
    return axios.get("https://api.marketstack.com/v1/intraday?access_key=" + APIkey + "&symbols=" + searchValue + "&interval=1min");
  },
};

