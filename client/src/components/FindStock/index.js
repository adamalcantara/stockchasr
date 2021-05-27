import React, { useState } from "react";
import API from "../../utils/API";
import SearchForm from "./SearchForm";

function FindStock() {

 const [stock, setStock] = useState('')

 const getStock = () => {
   API.findStock().then((res) => {
     console.log(res);
     setStock(res.data)
   })
 }

  
    return (
      <div>
        {/* <ul className="list-group">
          <li className="list-group-item">{this.state}</li>
        </ul> */}
        <SearchForm getStock={getStock} />
      </div>
    );

}

export default FindStock