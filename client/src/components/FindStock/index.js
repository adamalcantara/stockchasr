import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import SearchForm from "./SearchForm";
import Chart from "../Chart";

function FindStock() {
  const [stock, setStock] = useState({});
  const [market, setMarket] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [chartData, setChartData] = useState([])
  const [haveChartData, setHaveChartData] = useState([])

  //console.log the status of isSearched (should be false by default and changed to true once the getStockInfo function is called onClick of search button)
  console.log(isSearched)

  //Getting the stock info
  const getStockInfo = (search) => {
    console.log(`searchValue is: ${searchValue}`);
    //Call the getMarketInfo function
    getMarketInfo(searchValue);
    getChartInfo(searchValue);
    //Calling the function from the API file, then console logging the result
    API.findInfo(searchValue).then((res) => {
      console.log(res.data);
      // setting state to data 
      setStock(res.data)
      console.log(res.data.symbol)
      //set the state of search to res.data.symbol
      // setSearchValue(res.data.symbol)
    })
    //Set the status of isSearched to true (This will make elements visible on the page)
    
  }

  const handleInputChange = e => {
    setSearchValue(e.target.value)
  }

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

  //Empty array into which we will push stock data for the chart
  var dps = [];
  //Function to get info for the chart
  const getChartInfo = (search) => {
    //Making the API call
    API.findChartInfo(search)
      // .then(res => res.json())
      .then(
        (data) => {
          //Loop over data and push x and y values into the empty array above
          for (var i = 0; i < data.data.length; i++) {
            dps.push({
              //x is the date from the API, y is the closing value
              x: new Date(data.data[i].date),
              y: Number(data.data[i].close)
            });
          }
          console.log("CHART DATA RIGHT HERE")
          console.log(dps)
        }
      )
      //Call the function which will setChartData to the dps array above
      gotChartInfo();
  }

  //Function which will setChartData to the dps array above
  const gotChartInfo = () => {
    setChartData(dps);
    setIsSearched(true)
  }
  

  return (
    <div>
      {/* Search form element */}
      <SearchForm
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        getStockInfo={getStockInfo}
        stock={stock}
        isSearched={isSearched}
        setIsSearched={setIsSearched}
        handleInputChange={handleInputChange}
      />

      {/* All elements below only render when isSearched is true */}
      {isSearched ? <button onClick={() => API.addToWatchlist(stock)}>Add To Watchlist</button> : null}
      {isSearched ? <h1>{stock.symbol} <img src={stock.logo} style={{ width: '50', }}></img></h1> : <h1>Search For A Stock</h1>}
      
      {isSearched && chartData ? <Chart searchValue={searchValue} chartData={chartData} /> : "Loading..."}

      {isSearched ? <div className="stockData">
        <h2>{stock.name}</h2>
        <h4>{stock.ceo}</h4>
        <h5>{stock.industry}</h5>
        <h5>{stock.exchange} {stock.exchangeSymbol}</h5>
        <a href={stock.url}>{stock.url}</a>
        <p>{stock.description}</p>
      </div> : null}
    </div>
  );

}

export default FindStock