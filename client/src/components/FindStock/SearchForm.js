import React from 'react'

const SearchForm = ({ getStock }) => {
    return (
        <div>
            <h1>You have reached the FindStock element</h1>
            <input type='text' placeholder='Search'></input>
            <button className="ml-3 btn btn-primary" onClick={(e) => getStock(e)}>Search</button>
        </div>
    )
}

export default SearchForm

