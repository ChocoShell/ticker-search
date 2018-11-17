import React, { Component } from 'react';
import Chart from './Chart';

class ChartContainer extends Component {
  state = {
    width: 700,
    height: 500
  }
  formatData = (data, normalize) => {
    const keys = Object.keys(data);
    if (keys.length > 0) {
      const length = data.date.length;
      let finalData = [];
      for (let j=0; j < length; j++) {
        const node = {};
        for (let key of keys) {
          if (normalize) {
            node[key] = data[key][j]/data[key][0];
          } else {
            node[key] = data[key][j];
          }
        }
        finalData.push(node);
      }
      return finalData;
    }
  };
  render() {
    const {data, keys, normalize} = this.props;
    const formattedData = this.formatData(data, normalize);
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
