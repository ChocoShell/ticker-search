import React, { Component } from 'react';
import TickerSearchContainer from './TickerSearchContainer';
import StockChartContainer from './StockChartContainer';
import {getUrl} from './utils';

class StockTracker extends Component {
  state = {
    data: [],
    keys: ["close"],
    ticker: ""
  }

  handleSubmit = value => {
    const ticker = value;
    this.setState({ticker});
    this.getTickerInfo(ticker);
  }

  mapTickerData = tickerData => {
    return tickerData.map(dataPoint => {
      return {date: dataPoint.date, close: dataPoint.close};
    })
  }

  getTickerInfo = ticker => {
    // Make API call
    fetch(getUrl(ticker))
      .then(res => res.json())
      .then(
        result => {
          // Massage Data
          const tickerData = this.mapTickerData(result);
          // Put data into state
          this.setState({data: tickerData});
        },
        error => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <div>
        <TickerSearchContainer
          ticker={this.state.ticker}
          handleSubmit={this.handleSubmit}
        />
        <StockChartContainer
          data={this.state.data}
          keys={this.state.keys}
        />
      </div>
    );
  }
}

export default StockTracker;
