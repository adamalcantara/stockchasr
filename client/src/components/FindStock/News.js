import React from 'react'
import API from '../../utils/API'

const News = ({news}) => {
    return (
        <div>
            <h1>{news.title}</h1>
        </div>
    )
}

export default News
