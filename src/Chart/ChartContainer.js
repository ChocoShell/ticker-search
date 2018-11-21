import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import Chart from './Chart';

class ChartContainer extends Component {
  constructor() {
    super();
    this.width = 800;
    this.height = 500;
  }

  render() {
    console.log(this.props.newData);
    const {keys, colors} = this.props;
    return (
      <Chart 
        colors={colors}
        data={this.props.newData}
        keys={keys}
        width={this.width}
        height={this.height}
      />
    )
  }
}

const getFormattedChartData = (rawTickers, normalize) => {
  const tickers = rawTickers.filter(ticker => !("date" in ticker));
  let date = rawTickers.filter(ticker => "date" in ticker);
  let finalData = [];  
  if (tickers.length > 0) {
    date = date[0]['date'];
    console.log(date);
    const length = date.length;
    for (let j=0; j < length; j++) {
      const node = {date: date[j]};
      for (let ticker of tickers) {
        const key = ticker.ticker;
        if (normalize) {
          node[key] = (ticker.data[j]/ticker.data[0]).toFixed(4);
        } else {
          node[key] = ticker.data[j];
        }
      }
      finalData.push(node);
    }
    console.log("tickers", finalData);
  }
  return finalData;
}

const mapStateToProps = state => ({
  newData: getFormattedChartData(state.tickers, false)
});

export default connect(mapStateToProps, {})(ChartContainer);
