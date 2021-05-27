import React from 'react'

const SearchForm = ({ handleFormSubmit }) => {
    return (
        <div>
            <h1>You have reached the FindStock element</h1>
            <input type='text' placeholder='Search'></input>
            <button className="btn btn-primary" onClick={handleFormSubmit}>Search</button>
        </div>
    )
}

export default SearchForm

