import React, { useState } from "react";
import API from "../../utils/API";
import SearchForm from "./SearchForm";

function FindStock() {

 const [stock, setStock] = useState('')

 const getStock = (e) => {
   const search = e.target.previousSibling.value
   API.findStock(search).then((res) => {
     console.log(res.data.data);
     setStock(res.data.data)
   })
 }

  
    return (
      <div>
        {/* <ul className="list-group">
          <li className="list-group-item">{this.state}</li>
        </ul> */}
        <SearchForm getStock={getStock}/>
        <button>Add To Watchlist</button>
        {stock.length > 0 ? <h1>{stock[0].symbol}</h1> : ''}
        {stock.length > 0 ? <h1>{stock[0].exchange}</h1> : ''}
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