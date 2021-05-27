import React from 'react'


function findStock(props) {

    return (
        <form>
            <div className='form-group'>
                <input type='text' placeholder='Search' name='search'></input>
                <button className="btn btn-primary">Search</button>
            </div>
        </form>
    )
}


export default findStock