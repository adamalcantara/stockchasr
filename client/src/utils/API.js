import axios from "axios";
const BASEURL = "https://api.marketstack.com/v1/intraday?access_key=";
const APIKEY = process.env.API_KEY;
const polyAPIKEY = process.env.POLY_KEY;

export default {
  search: function(BASEURL) {
    return axios.get(BASEURL + APIKEY + '&symbols=' +  "&interval=1min");
  }

};
