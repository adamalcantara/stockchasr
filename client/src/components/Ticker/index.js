import React, { useState } from 'react'
import API from "../../utils/API";
import './style.css'
const Ticker = () => {

    // const [prices, setPrices] = useState([])

    
    function getCoin() {
        let tickerPrices = [];
        API.findCoinStockPrice().then((res) => {
            console.log(res.data)
            for (var i = 0; i < res.data.length; i++) {
                tickerPrices.push({
                    coinPrice: res.data.close
                })
            }
            // setPrices(tickerPrices)
        })
    }
    function getEa() {
        let tickerPrices = [];
        API.findEaStockPrice().then((res) => {
            console.log(res.data)
            for (var i = 0; i < res.data.length; i++) {
                tickerPrices.push({
                    eaPrice: res.data.close
                })
            }
            // setPrices(tickerPrices)
        })
    }
  
    function getDis() {
        let tickerPrices = [];
        API.findDisStockPrice().then((res) => {
            console.log(res.data)
            for (var i = 0; i < res.data.length; i++) {
                tickerPrices.push({
                    disPrice: res.data.close
                })
            }
            // setPrices(tickerPrices)
        })
    }
 
    function getOrcl() {
        let tickerPrices = [];
        API.findOrclStockPrice().then((res) => {
            console.log(res.data)
            for (var i = 0; i < res.data.length; i++) {
                tickerPrices.push({
                    orclPrice: res.data.close
                })
            }
            // setPrices(tickerPrices)
            console.log(tickerPrices)
        })
    }

    setTimeout(getCoin, 1000)
    setTimeout(getEa, 2000)
    setTimeout(getDis, 3000)
    setTimeout(getOrcl, 4000)
   

    return (
        <div id='ticker'>
            <div>
                <span className='tickerSymbol'>COIN</span>
                <span className='tickerPrice'>$228.79</span>
            </div>
            <div>
                <span className='tickerSymbol'>ORCL</span>
                <span className='tickerPrice'>$82.89</span>
            </div>
            <div>
                <span className='tickerSymbol'>DIS</span>
                <span className='tickerPrice'>$177.18</span>
            </div>
            <div>
                <span className='tickerSymbol'>EA</span>
                <span className='tickerPrice'>$145.21</span>
            </div>
            
        </div>
    )
}

export default Ticker
