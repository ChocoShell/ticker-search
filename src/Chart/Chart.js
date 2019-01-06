// https://blog.logrocket.com/data-visualization-in-react-using-react-d3-c35835af16d0
import React from 'react';
import {LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip} from 'recharts';
import "./Chart.css";

const Chart = ({data, keys, colors, ylabel}) => {
  return (
    <div className="chart">
      <LineChart width={800} height={600} data={data}>
        <XAxis label="Date" dataKey="date"/>
        <YAxis label={ylabel} type="number" domain={['auto', 'auto']} />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        {keys && keys.map(key => <Line type="monotone" dataKey={key} key={key} stroke={colors[key]} />)}
      </LineChart>
    </div>
  )
}

export default Chart;
