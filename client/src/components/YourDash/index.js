import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import API from "../../utils/API";
import "./style.css"

const YourDash = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  function getAllWatchlist() {

    API.getWatchlist().then((res) => {
      console.log(res.data);
      //Empty array for which to push the watchlist items
      var watchlistSymbol = [];
      console.log("This is the watchlist");
      console.log(watchlistSymbol);
      //Loop over the data and push the symbol and CEO name (temporary) into the empty array above.
      for (var i = 0; i < res.data.length; i++) {
        watchlistSymbol.push({
          symbol: res.data[i].symbol,
          close: res.data[i].close,
          high: res.data[i].high,
          low: res.data[i].low,
          id: res.data[i]._id
        });
        setIsSearched(true)
      }
      //Set the state of watchlist to the array above
      setWatchlist(watchlistSymbol)
    });
  }
  //UseEffect function, runs on page load, only once
  useEffect(() => {
    getAllWatchlist();
  }, []);

  console.log(watchlist);
  // function that calls deleteStock API
  function submit(id) {
    console.log('this is the id', id)
    API.deleteStock(id).then(data => {
      console.log(" this is data", data)
      if (data.status === 200) {
        getAllWatchlist()
        setIsSearched(false)
      }
    });

  }

  return (
    <div id="dashboard">
      <h1>Dashboard</h1>
      {isSearched === false ? <h5>You don’t have anything in your watch list yet!  Add something to your watch list in the Find Stock page.</h5> : ''}
      <div>
        <table id="watch-list">
          {isSearched ? <thead>
            <tr>
              <th>Symbol</th>
              <th>Close</th>
              <th>High</th>
              <th>Low</th>
              <th></th>
            </tr>
          </thead> : ''}
          {isSearched ? <tbody>
            {watchlist.map((stock, i) => {
              console.log(stock.id)
              return (
                <tr key={i}>
                  <td>
                    {stock.symbol}
                  </td>
                  <td>
                    {stock.close}
                  </td>
                  <td>
                    {stock.high}
                  </td>
                  <td>
                    {stock.low}
                  </td>
                  <td>
                    <button onClick={(e) => submit(stock.id)} className="deleteBtn"><FaTimes style={{ color: 'white' }} className="dBtn" /></button>
                  </td>
                </tr>
              )
            })}
          </tbody> : ''}
        </table>
      </div>


    </div>

  );
};

export default YourDash;
