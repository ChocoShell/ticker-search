import React, { Component } from 'react';
import Chart from './Chart';

class ChartContainer extends Component {
  constructor() {
    super();
    this.width = 800;
    this.height = 500;
  }
  formatData = (data, normalize) => {
    const keys = Object.keys(data).filter(key => key !== "date");
    if (keys.length > 0) {
      const length = data.date.length;
      let finalData = [];
      for (let j=0; j < length; j++) {
        const node = {date: data.date[j]};
        for (let key of keys) {
          if (normalize) {
            node[key] = (data[key][j]/data[key][0]).toFixed(4);
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
    const {data, keys, normalize, colors} = this.props;
    const formattedData = this.formatData(data, normalize);
    return (
      <Chart 
        colors={colors}
        data={formattedData}
        keys={keys}
        width={this.width}
        height={this.height}
      />
    )
  }
}

export default ChartContainer;
