import React, { Component } from "react";
import CanvasJSReact from '../../assets/canvasjs.stock.react';
import API from "../../utils/API";
import SearchForm from "../FindStock/SearchForm"
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;


class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = { dataPoints: [], isLoaded: true };
        console.log("These are the props")
        console.log(this.props.searchValue)
    }

    componentDidMount(search) {
        //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
        fetch("https://api.marketstack.com/v1/eod?access_key=d8fc6a7a05fe981d498316ed91194d9d&symbols=AAPL&date_from=2000-05-20&date_to=2021-05-30&limit=365")
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
                    this.setState({
                        isLoaded: true,
                        dataPoints: dps
                    });
                }
            )
    }

    // componentDidMount() {
    //     this.getItems()
    // }

    // getItems() {
    //     this.setState({ 'isLoading': true });
    //     API.findChartInfo().then(items => this.setState({ items, 'isLoading': false }))
    //         // .catch(error => this.setState({ error, isLoading: false }));
    //         .then(res => res.json())
    //         .then(
    //             (data) => {
    //                 var dps = [];
    //                 for (var i = 0; i < data.data.length; i++) {
    //                     dps.push({
    //                         x: new Date(data.data[i].date),
    //                         y: Number(data.data[i].close)
    //                     });
    //                 }
    //                 this.setState({
    //                     isLoaded: true,
    //                     dataPoints: dps
    //                 });
    //             }
    //         )
    // }

    render() {
        const options = {
            title: {
                text: "React StockChart with Spline Area Chart"
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