import React, { useState, useEffect } from 'react'


import macbook from "./homeimg.png"
import News from '../FindStock/News'
import API from '../../utils/API'
import "./style.css"


const Land = () => {

    return (

        <div>
            <div id="landpgcontent">
                <div id="text">
                <p>Track your investments & search for new opportunities.</p>
                <p>Join StockChasr today.</p>
                </div>
                <img src={macbook} alt="macbook with screenshot" id="macbook"></img>
            </div>
        </div>

    )
}

export default Land
