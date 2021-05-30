import React, { Component } from "react";
import CanvasJSReact from '../../assets/canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;


class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = { dataPoints: [], isLoaded: false };
    }

    componentDidMount() {
        //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
        fetch("https://canvasjs.com/data/gallery/react/btcusd2017-18.json")
            .then(res => res.json())
            .then(
                (data) => {
                    var dps = [];
                    for (var i = 0; i < data.length; i++) {
                        dps.push({
                            x: new Date(data[i].date),
                            y: Number(data[i].close)
                        });
                    }
                    this.setState({
                        isLoaded: true,
                        dataPoints: dps
                    });
                }
            )
    }

    render() {
        console.log("These are the props:")
        console.log(this.props);
        console.log("Printing something specific")
        console.log(this.props.market.data)
        // console.log(this.props.stock.ceo);
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