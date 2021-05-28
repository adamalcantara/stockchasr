import React from 'react'

const SearchForm = ({ getStock, getStockInfo }) => {
    return (
        <div>
            <h1>You have reached the FindStock element</h1>
            <input type='text' placeholder='Search'></input>
            <button className="ml-3 btn btn-primary" onClick={(e) => getStockInfo(e)} >Search</button>
        </div>
    )
}

export default SearchForm

