import React, {useRef} from 'react'
import API from '../../utils/API' 

const SearchForm = ({ stock, getStockInfo, getStockNews }) => {
    const input = useRef()
    console.log(input)
    return (
        <div>
            <h1>You have reached the FindStock element</h1>
            <input type='text' placeholder='Search' ref={input}></input>
            
            <button className="ml-3 btn btn-primary" onClick={(e) => getStockInfo(input.current.value)} >Search</button>
        </div>
    )
}

export default SearchForm

