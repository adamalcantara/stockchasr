import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import SearchForm from "./SearchForm";
import CommentForm from "../CommentForm";
import CanvasJSReact from '../../assets/canvasjs.stock.react';
import "./style.css"
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
const ApiKey = process.env.REACT_APP_API_KEY;


function FindStock() {
  const [stock, setStock] = useState({});
  const [market, setMarket] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [chartData, setChartData] = useState([])
  const [haveChartData, setHaveChartData] = useState([])
  const [dailyData, setDailyData] = useState({})
  const [commentList, setCommentList] = useState([]);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


  //console.log the status of isSearched (should be false by default and changed to true once the getStockInfo function is called onClick of search button)
  console.log(isSearched)

  //Getting the stock info
  const getStockInfo = (search) => {
    console.log(`searchValue is: ${searchValue}`);
    //Call the getMarketInfo function
    getMarketInfo(searchValue);
    getChartInfo(searchValue);
    getDailyInfo(searchValue);
    getAllComments(searchValue);
    newChartInfo(searchValue)
    //Calling the function from the API file, then console logging the result
    API.findInfo(searchValue).then((res) => {
      console.log(res.data);
      // setting state to data 
      setStock(res.data)
      setSearchValue("")
      console.log(res.data.symbol)
      //set the state of search to res.data.symbol
      // setSearchValue(res.data.symbol)
    })
    //Set the status of isSearched to true (This will make elements visible on the page)

  }

  const newChartInfo = (search) => {

    API.findChartInfo(search)
    .then(
        (data) => {
          var dps = [];
          for (var i = 0; i < data.data.length; i++) {
            dps.push({
              x: new Date(data.data[i].date),
              y: Number(data.data[i].close)
            });
          }
          console.log("DUMMY CHART DATA RIGHT HERE")
          console.log(dps)
          setIsLoaded(true)
          setData(dps)
        }
      )
  }

  // Moved here because this component renders everything
  function getAllComments(searchValue) {
    console.log("Alligators cant get aids");
    API.getComment(searchValue).then((res) => {
      console.log(res.data);
      var commentListArr = [];
      console.log("This is from the get all comments function");
      console.log(commentListArr);
      for (var i = 0; i < res.data.length; i++) {
        console.log('Look here', res.data[i].stock)
        commentListArr.push({
          username: res.data[i].username,
          comment: res.data[i].comments,
        });
      }
      setCommentList(commentListArr);

    });
  }

  const getDailyInfo = (search) => {
    var todayDate = new Date().toISOString().slice(0, 10);
    todayDate = todayDate.toString()
    API.findDailyInfo(search, todayDate).then((res) => {
      console.log('This is the Daily Info')
      console.log(res.data)

      setDailyData(res.data)
    })
  }

  const handleInputChange = e => {
    setSearchValue(e.target.value.toUpperCase())
  }

  useEffect(() => {
    setData([])
  }, []);

  const options = {
    backgroundColor: "#181818",
    theme: "dark1",
    charts: [{
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: "MMM DD YYYY"
        }
      },
      axisY: {
        title: "Stock Price",
        prefix: "$",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: "$#,###.##"
        }
      },
      toolTip: {
        shared: true
      },
      data: [{
        name: "Price (in USD)",
        type: "splineArea",
        color: "#4577b5",
        yValueFormatString: "$#,###.##",
        xValueFormatString: "MMM DD YYYY",
        dataPoints: data
      }]
    }],
    navigator: {
      slider: {
        minimum: new Date("2017-05-01"),
        maximum: new Date("2018-05-01")
      }
    }
  };
  const containerProps = {
    width: "100%",
    height: "450px",
    margin: "auto"
  };

  let dataPoints = [];

  //Getting the market info
  const getMarketInfo = (search) => {
    //Call the API function and get data from the marketstack API
    API.findStock(search).then((res) => {
      console.log("This is the MARKET data")
      console.log(res.data);
      //Set the market state to data
      setMarket(res.data);
    })
  }

  //Empty array into which we will push stock data for the chart
  var dps = [];
  //Function to get info for the chart
  const getChartInfo = (search) => {
    //Making the API call
    API.findChartInfo(search)
      // .then(res => res.json())
      .then(
        (data) => {
          //Loop over data and push x and y values into the empty array above
          for (var i = 0; i < data.data.length; i++) {
            dps.push({
              //x is the date from the API, y is the closing value
              x: new Date(data.data[i].date),
              y: Number(data.data[i].close)
            });
          }
          console.log("CHART DATA RIGHT HERE")
          console.log(dps)
        }
      )
    //Call the function which will setChartData to the dps array above
    gotChartInfo();
  }

  //Function which will setChartData to the dps array above
  const gotChartInfo = () => {
    setChartData(dps);
    setIsSearched(true)
  }


const handleWatchlist = () => {
  API.addToWatchlist(dailyData).then(res =>{
    console.log(res)
    alert(res.data.message)
    // if(res.data.message==="Already added"){
    //   alert("Error Adding To Watchlist")
    // }
  })
  .catch (err => {
    console.log(err)
  })
}

  return (
    <div id="findstock">
      <h1>Find A Stock</h1>

      {/* Search form element */}
      <SearchForm
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        getStockInfo={getStockInfo}
        stock={stock}
        isSearched={isSearched}
        setIsSearched={setIsSearched}
        handleInputChange={handleInputChange}
      />

      <div className="magicBox">
        {/* All elements below only render when isSearched is true */}
        {isSearched ?
          <div className="stockHeader">
            <h1 className="stockSymbol">{stock.symbol}</h1>
            <img src={stock.logo} className="stockImg"></img>
            <button className="btn watchlistbtn" onClick={handleWatchlist}>Add To Watchlist</button>
          </div>
          : <h1>Search For A Stock</h1>}

        {isSearched ? <CanvasJSStockChart containerProps={containerProps} options={options} /> : null}


        {isSearched ? <div className="stockData">

        <div className="stats">
            <h2 id="stockname">{stock.name}</h2>
            <h4 id="stockceo"><strong>CEO: </strong>{stock.ceo}</h4>
            <h5 id="stockindustry"><strong>Industry: </strong> {stock.industry}</h5>
            <h5 id="stockexchange"><strong>Exchange: </strong> {stock.exchange} ({stock.exchangeSymbol})</h5>
            <a id="stockurl" href={stock.url} target="_blank" rel="noreferrer noopener">{stock.url}</a>
            <p id="stockdescription">{stock.description}</p>
          </div>

          <div className="comments">
            <CommentForm getComments={getAllComments} commentList={commentList} searchValue={searchValue} stockName={stock.symbol} />
          </div>

        </div> : null}
      </div>

    </div>
  );

}

export default FindStock