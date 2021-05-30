import React, { useState } from 'react'
import API from "../../utils/API";

const YourDash = () => {
    const [watchlist, setWatchlist] = useState({})

    const watchlistData = () => {
        API.getWatchlist().then((res) => {
            console.log(res.data)
            setWatchlist(res.data)
        })
    }

    return (
        <div>
            <h1>You have reached Your Dashboard</h1>
            <button onClick={watchlistData}>Click Here</button>
        </div>
    )
}

export default YourDash
