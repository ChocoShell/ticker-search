import React, { Component } from 'react';
import StockChart from './StockChart';

class StockChartContainer extends Component {
  state = {
    width: 700,
    height: 500    
  }
  render() {
    const {data, keys} = this.props;
    return (
      <StockChart 
        keys={keys}
        data={data} 
        width={this.state.width} 
        height={this.state.height}
      />
    )
  }
}

export default StockChartContainer;
