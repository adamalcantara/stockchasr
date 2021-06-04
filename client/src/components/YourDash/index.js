import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import API from "../../utils/API";

const YourDash = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isSearched, setIsSearched] = useState(true);

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
    // //Get the watchlist from the API
    // API.getWatchlist().then((res) => {
    //   console.log(res.data);
    //   //Empty array for which to push the watchlist items
    //   var watchlistSymbol = [];
    //   console.log("This is the watchlist");
    //   console.log(watchlistSymbol);
    //   //Loop over the data and push the symbol and CEO name (temporary) into the empty array above.
    //   for (var i = 0; i < res.data.length; i++) {
    //     watchlistSymbol.push({
    //       symbol: res.data[i].symbol,
    //       close: res.data[i].close,
    //       high: res.data[i].high,
    //       low: res.data[i].low,
    //       id: res.data[i]._id
    //     });
    //   }
    //   //Set the state of watchlist to the array above
    //   setWatchlist(watchlistSymbol)
    // });
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
    <div>
      <h1>You have reached Your Dashboard</h1>
      {isSearched === false ? <h5>You don’t have anything in your watch list yet!  Add something to your watch list in the Find Stock page.</h5>: ''}
       <div>
      <table id="watch-list">
      {isSearched ?<thead>
          <tr>
            <th></th>
            <th>Symbol</th>
            <th>Close</th>
            <th>High</th>
            <th>Low</th>
          </tr>
        </thead>: ''}
        {isSearched ? <tbody>
          {watchlist.map((stock, i) => {
            console.log(stock.id)
            return (
              <tr key={i}>
                <td>
                  <button onClick={(e) => submit(stock.id)}><FaTimes style={{ color: 'red' }} /></button>
                </td>
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
              </tr>
            )
          })}
        </tbody>: ''}
      </table> 
      </div>
      

    </div>

  );
};

export default YourDash;
