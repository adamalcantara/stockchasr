import axios from "axios";
const ApiKey = 'd8fc6a7a05fe981d498316ed91194d9d';
const polyApi = 'ed_5Kc2Wrznyf4U8Upim_3pyVBqDKnXS';

export default {
  findStock: function (searchValue) {
    return axios.get("https://api.marketstack.com/v1/intraday?access_key=" + ApiKey + "&symbols=" + searchValue + "&interval=1min");
  },
  findInfo: function (searchValue) {
    return axios.get("https://api.polygon.io/v1/meta/symbols/" + searchValue + "/company?&apiKey=" + polyApi);
  },
};
