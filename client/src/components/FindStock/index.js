import React, { useState } from "react";
import API from "../../utils/API";
import SearchForm from "./SearchForm";
import Chart from "../Chart";

function FindStock() {

  const [stock, setStock] = useState({})
  const [market, setMarket] = useState({})
  const [news, setNews] = useState({})

  //Set the state as false by default

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

  
  // let stockData = [];
  // console.log(stockData);

  const getStockInfo = (search) => {
    // how we are hooking into search input
    //  const search = e.target.previousSibling.value
    getMarketInfo(search);
    getChartInfo(search);
    getStockNews(search);
    API.findInfo(search).then((res) => {
      console.log(res.data);
      // stockData.push(res.data);
      // setting state to data 
      setStock(res.data)
    })
  }

  const getMarketInfo = (search) => {
    API.findStock(search).then((res) => {
      console.log("This is the MARKET data")
      console.log(res.data);
      setMarket(res.data);
    })
  }

  const getChartInfo = (search) => {
    API.findStock(search).then((res) => {
      console.log("This is the CHART data")
      console.log(res.data);
      console.log(res.data.data[99].open)
      var chartData = [];
      for (var i = 0; i < res.data.length; i++) {
        chartData.push(res.data.data[0].date)
      }
      console.log(chartData);
    })
  }



  return (
    <div>

      <SearchForm getStockInfo={getStockInfo} stock={stock} getStockNews={getStockNews} news={news} />
      <button onClick={()=> API.addToWatchlist(stock)}>Add To Watchlist</button>
      {/* Ticker Symbol */}
      <h1>{stock.symbol} <img src={stock.logo} style={{ width: '50', }}></img></h1>
      <Chart getMarketInfo={getMarketInfo} market={market} />
      {/* Company Name */}
      <h2>{stock.name}</h2>
      <h4>{stock.ceo}</h4>
      <h5>{stock.industry}</h5>
      <h5>{stock.exchange} {stock.exchangeSymbol}</h5>
      {/* Company Website */}
      <a href={stock.url}>{stock.url}</a>
      {/* {stock.length > 0 ? <h2>About</h2> : ''} */}
      {/* Company Description */}
      <p>{stock.description}</p>
      {/* {stock.length > 0 ? <h2>{stock[0].exchange}</h2> : ''} */}
      {/* <h1>{news.author}</h1> */}
      {/* <p>{news.results}</p> */}
    </div>
  );

}

export default FindStock