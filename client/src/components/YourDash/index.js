import React, { useState, useEffect } from "react";
import API from "../../utils/API";

const YourDash = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    API.getWatchlist().then((res) => {
      console.log(res.data);
    //   setWatchlist(res.data);
      console.log(res.data[0].symbol);
      var watchlistSymbol = [];
      console.log("This is the watchlist");
      console.log(watchlistSymbol);
      for (var i = 0; i < res.data.length; i++) {
        watchlistSymbol.push(res.data[i].symbol);
      }
      setWatchlist(watchlistSymbol)
    });
  }, []);

  console.log(watchlist);

  return (
    <div>
      <h1>You have reached Your Dashboard</h1>
      
        <div> </div>
            <table id="watch-list">
                <tbody>
                    {watchlist.map((stock) => {
                        return(
                        <tr>
                            {stock}
                        </tr>
                        )
                    })}
                </tbody>
            </table>
    </div>
  
  );
};

export default YourDash;
