import React, { useState } from "react";
import API from "../../utils/API";
import SearchForm from "./SearchForm";

function FindStock() {

 const [stock, setStock] = useState({})

//  const getStock = (e) => {
//    const search = e.target.previousSibling.value
//    API.findStock(search).then((res) => {
//      console.log(res.data.data);
//      setStock(res.data.data)
//    })
//  }


 const getStockInfo = (e) => {
   // how we are hooking into search input
   const search = e.target.previousSibling.value
   API.findInfo(search).then((res) => {
     console.log(res.data);
     // setting state to data 
     setStock(res.data)
   })
 }
  
    return (
      <div>

        <SearchForm getStockInfo={getStockInfo}/>
        {/* Ticker Symbol */}
        <h1>{stock.symbol} <img src={stock.logo} style={{ width: '50', }}></img></h1>
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
      </div>
    );
    
  }
  
  export default FindStock

  // Map Method
  {/* {stock.length > 0 ? 
      stock.map((shares) => (
        <div>
          <h1>{shares.symbol}</h1>
        </div>
      ))
    
  : ''} */}