import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import SearchForm from "./SearchForm";
import Chart from "../Chart";
import CommentForm from "../CommentForm";

function FindStock() {
  const [stock, setStock] = useState({});
  const [market, setMarket] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [chartData, setChartData] = useState([])

  //console.log the status of isSearched (should be false by default and changed to true once the getStockInfo function is called onClick of search button)
  console.log(isSearched)

  //Getting the stock info
  const getStockInfo = (search) => {
    //Call the getMarketInfo function
    getMarketInfo(search);
    getChartInfo(search);
    //Calling the function from the API file, then console logging the result
    API.findInfo(search).then((res) => {
      console.log(res.data);
      // setting state to data 
      setStock(res.data)
      console.log(res.data.symbol)
      //set the state of search to res.data.symbol
      setSearchValue(res.data.symbol)
      console.log(setSearchValue)
    })
    //Set the status of isSearched to true (This will make elements visible on the page)
    setIsSearched(true)
  }

  useEffect(() => console.log(searchValue), [searchValue]);

  //Getting the market info
  const getMarketInfo = (search) => {
    //Call the API function and get data from the marketstack API
    API.findStock(search).then((res) => {
      console.log("This is the MARKET data")
      console.log(res.data);
      //Set the market state to data
      setMarket(res.data);
    })
  }

  var dps = [];

  const getChartInfo = (search) => {
    API.findChartInfo(search)
      // .then(res => res.json())
      .then(
        (data) => {
          
          for (var i = 0; i < data.data.length; i++) {
            dps.push({
              x: new Date(data.data[i].date),
              y: Number(data.data[i].close)
            });
          }
          console.log("CHART DATA RIGHT HERE")
          console.log(dps)
        }
      )
      gotChartInfo();
  }

  const gotChartInfo = () => {
    setChartData(dps);
  }
  

  return (
    <div>
      {/* Search form element */}
      <SearchForm
        value={searchValue}
        getStockInfo={getStockInfo}
        stock={stock}
        isSearched={isSearched}
        setIsSearched={setIsSearched}
      />

      {/* All elements below only render when isSearched is true */}
      {isSearched ? <button onClick={() => API.addToWatchlist(stock)}>Add To Watchlist</button> : null}
      {isSearched ? <h1>{stock.symbol} <img src={stock.logo} style={{ width: '50', }}></img></h1> : <h1>Search For A Stock</h1>}
      {isSearched ? <Chart chartData={chartData} setChartData={setChartData} /> : null}

      {isSearched ? <div className="stockData">
        <h2>{stock.name}</h2>
        <h4>{stock.ceo}</h4>
        <h5>{stock.industry}</h5>
        <h5>{stock.exchange} {stock.exchangeSymbol}</h5>
        <a href={stock.url}>{stock.url}</a>
        <p>{stock.description}</p>
      </div> : null}
      {isSearched ? <CommentForm searchValue={searchValue} />: ""}
    </div>
  );

}

export default FindStock