import React from 'react'
import "./style.css"

const SearchForm = ({  getStockInfo, searchValue, handleInputChange }) => {
    // const input = useRef()
    
    return (
        <div className="searchForm">
            <input className="input" type='text' placeholder='Search' onChange={handleInputChange} value={searchValue}></input>
            {/* On click, call the getStockInfo function using the current value of input */}
            <button className="btn" onClick={(e) => getStockInfo(searchValue)} >Search</button>
        </div>
    )
}

export default SearchForm

