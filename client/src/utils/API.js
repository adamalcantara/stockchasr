import axios from "axios";


export default {
  findStock: function () {
    return axios.get(
      "https://api.marketstack.com/v1/intraday?access_key=d8fc6a7a05fe981d498316ed91194d9d&symbols=AAPL&interval=1min"
    );
  },
};
