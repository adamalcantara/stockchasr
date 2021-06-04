import React, { Component } from "react";
import CanvasJSReact from '../../assets/canvasjs.stock.react';
import API from "../../utils/API";
import SearchForm from "../FindStock/SearchForm"
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
require('dotenv').config()
const ApiKey = process.env.REACT_APP_API_KEY;


class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = { dataPoints: [], isLoaded: false };
        // console.log("This is the state")
        // console.log(this.state)
        console.log("These are the props")
        console.log(this.props)
    }

    componentDidMount(search) {
        //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
        
        fetch("https://api.marketstack.com/v1/eod?access_key=" + ApiKey + "&symbols=" + this.props.searchValue + "&date_from=2000-05-20&date_to=2021-05-30&limit=365")
            .then(res => res.json())
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
                    this.setState({
                        isLoaded: true,
                        dataPoints: dps
                    });
                    console.log("This is the state")
                    console.log(this.state)
                }
            )
    }

    // componentDidMount() {
    //     this.getItems()
    // }

    // getItems() {
    //     console.log("DEFAULT DATA")
    //     console.log(this.props.chartData)
    //     var chartDataArray = this.props.chartData
    //     console.log("LEEEERRRRROOOOOOOOYYYYYY JEEENKIIINNNNNSSSSSS")
    //     console.log(chartDataArray)
    
    //     this.setState({
    //         isLoaded: true,
    //         dataPoints: chartDataArray
    //     })
        
    // }

    render() {
        console.log("This is the state")
        console.log(this.state)

        const options = {
            title: {
                text: ""
            },
            theme: "light2",
            subtitles: [{
                text: "USD"
            }],
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
                    dataPoints: this.state.dataPoints
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
        return (
            <div>
                <div>
                    {/* <p>{this.state.isLoaded && 'THIS STATE ISLOADED : TRUE'}</p>
                    <p>{JSON.stringify(this.state.dataPoints)}</p> */}
                    {
                        // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
                        this.state.isLoaded &&
                        <CanvasJSStockChart containerProps={containerProps} options={options}
                        /* onRef = {ref => this.chart = ref} */
                        />
                    }
                </div>
            </div>
        );
    }
}

export default Chart;