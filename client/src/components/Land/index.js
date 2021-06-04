import React, { useState, useEffect } from 'react'
import News from '../FindStock/News'
import API from '../../utils/API'

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
            <h1>Hello there, welcome to StockChasr</h1>
            <p>Track your investments & search for new opportunities.</p>
            {/* <h2>{news.title}</h2> */}
            {/* <News news={news}/> */}
        </div>
    )
}

export default Land
