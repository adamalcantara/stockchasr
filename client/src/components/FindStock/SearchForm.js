import React, {useRef} from 'react'
import API from '../../utils/API' 

const SearchForm = ({ stock, getStockInfo }) => {

    const input = useRef()
    console.log(input.current)
    return (
        <div>
            <h1>You have reached the FindStock element</h1>
            <input type='text' placeholder='Search' ref={input}></input>
            {/* On click, call the getStockInfo function using the current value of input */}
            <button className="ml-3 btn btn-primary" onClick={(e) => getStockInfo(input.current.value)} >Search</button>
        </div>
    )
}

export default SearchForm

