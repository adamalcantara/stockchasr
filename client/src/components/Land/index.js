import React, { useState, useEffect } from 'react'
import macbook from "./homeimg.png"
import News from '../FindStock/News'
import API from '../../utils/API'
import "./style.css"

const Land = () => {
    // const news = [];

    // const getNewsLand = () => {
    //     API.findNewsLand().then((res) => {
    //         console.log(res.data.results[0])
    //         for (var i = 0; i < res.data.results.length; i++) {
    //             news.push({
    //                 title: res.data.results[0].title,
    //                 description: res.data.results[0].description,
    //                 url: res.data.results[0].article_url,
    //                 image: res.data.results[0].image_url
    //             });
    //         }
    //     })
    // }
    // console.log(news)
    // useEffect(() => getNewsLand())
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
