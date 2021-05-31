import React, { useState } from "react";
import API from "../../utils/API";
import SearchForm from "./SearchForm";
import Chart from "../Chart";

function FindStock() {

  const [stock, setStock] = useState({});
  const [market, setMarket] = useState({});
  const [news, setNews] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  //console.log the status of isSearched (should be false by default and changed to true once the getStockInfo function is called onClick of search button)
  console.log(isSearched)

  //  const getStock = (e) => {
  //    const search = e.target.previousSibling.value
  //    API.findStock(search).then((res) => {
  //      console.log(res.data.data);
  //      setStock(res.data.data)
  //    })
  //  }
  const getStockNews = (search) => {
    API.findNews(search).then((res) => {
      // console.log('This is the payload --')
      // console.log(res.data);
      // console.log('This is the end of the payload --')
      // console.log('Title of first index---');
      // console.log(res.data.results[0].title);
      // console.log('end of first index---');
      // // console.log(res.data.results);
      // // const results = res.data.results[0].title;
      // // console.log(results)
      // // const newsList = results.map((d) => <li key={d.title}>{d.title}</li>);
      // // console.log(newsList)
      // setNews(res.data)
    })
  }

  //Getting the stock info
  const getStockInfo = (search) => {
    // getMarketInfo(search);
    // getChartInfo(search);
    //Calling the getStockNews function
    getStockNews(search);
    //Calling the function from the API file, then console logging the result
    API.findInfo(search).then((res) => {
      console.log(res.data);
      // setting state to data 
      setStock(res.data)
      console.log(res.data.symbol)
      setSearchValue(res.data.symbol)
    })
    setIsSearched(true)
  }

  //Getting the market info
  const getMarketInfo = (search) => {
    API.findStock(search).then((res) => {
      console.log("This is the MARKET data")
      console.log(res.data);
      setMarket(res.data);
      console.log("MARKET DATA LOG")
      console.log(market)
    })
  }

  const getChartInfo = (search) => {
    API.findStock(search).then((res) => {
      console.log("This is the CHART data")
      console.log(res.data);
    })
  }

  return (
    <div>
      {/* Search form element */}
      <SearchForm
        value={searchValue}
        getStockInfo={getStockInfo}
        stock={stock}
        getStockNews={getStockNews}
        news={news}
        isSearched={isSearched}
        setIsSearched={setIsSearched}
      />

      {/* All elements below only render when isSearched is true */}
      {isSearched ? <button onClick={() => API.addToWatchlist(stock)}>Add To Watchlist</button> : null}
      {isSearched ? <h1>{stock.symbol} <img src={stock.logo} style={{ width: '50', }}></img></h1> : <h1>Search For A Stock</h1>}
      {isSearched ? <Chart setSearchValue={setSearchValue} searchValue={searchValue} market={market} /> : null}
      
      {isSearched ? <div className="stockData">
        <h2>{stock.name}</h2>
        <h4>{stock.ceo}</h4>
        <h5>{stock.industry}</h5>
        <h5>{stock.exchange} {stock.exchangeSymbol}</h5>
        <a href={stock.url}>{stock.url}</a>
        {/* {stock.length > 0 ? <h2>About</h2> : ''} */}
        {/* Company Description */}
        <p>{stock.description}</p>
      </div> : null}

      {/* {stock.length > 0 ? <h2>{stock[0].exchange}</h2> : ''} */}
      {/* <h1>{news.author}</h1> */}
      {/* <p>{news.results}</p> */}
    </div>
  );

}

export default FindStock