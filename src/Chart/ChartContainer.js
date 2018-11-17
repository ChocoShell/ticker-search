import React, { Component } from 'react';
import Chart from './Chart';

class ChartContainer extends Component {
  state = {
    width: 700,
    height: 500
  }
  formatData = data => {
    const keys = Object.keys(data);
    if (keys.length > 0) {
      const length = data.date.length;
      let finalData = [];
      for (let j=0; j < length; j++) {
        const node = {};
        for (let key of keys) {
          node[key] = data[key][j];
        }
        finalData.push(node);
      }
      return finalData;
    }
  };
  render() {
    const {data, keys} = this.props;
    const formattedData = this.formatData(data);
    return (
      <Chart 
        keys={keys}
        data={formattedData}
        width={this.state.width}
        height={this.state.height}
      />
    )
  }
}

export default ChartContainer;
