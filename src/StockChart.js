// https://blog.logrocket.com/data-visualization-in-react-using-react-d3-c35835af16d0
import React, { Component } from 'react';
import {LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip} from 'recharts';
import "./StockChart.css";

class StockChart extends Component {
  render() {
    const {width, height, data, keys} = this.props;
    return (
      <div className="chart">
        <LineChart width={width} height={height} data={data}>
          <XAxis dataKey="date"/>
          <YAxis type="number" domain={['auto', 'auto']} />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          {keys && keys.map(key => <Line type="monotone" dataKey={key} key={key} stroke="#8884d8" />)}
        </LineChart>
      </div>
    )
  }
}

// <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
// <Line type="monotone" dataKey="amt" stroke="#8084d8" />
export default StockChart;
