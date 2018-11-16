import React, { Component } from 'react';
import StockChart from './StockChart';

class StockChartContainer extends Component {
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
    return (
      <StockChart 
        keys={keys}
        data={this.formatData(data)} 
        width={this.state.width} 
        height={this.state.height}
      />
    )
  }
}

export default StockChartContainer;
