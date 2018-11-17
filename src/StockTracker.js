import React, { Component } from 'react';
import ListContainer from './List/ListContainer';
import SearchBarContainer from './SearchBar/SearchBarContainer';
import ChartContainer from './Chart/ChartContainer';
import "./StockTracker.css";
import {getUrl} from './utils';

class StockTracker extends Component {
  state = {
    data: {},
    keys: [],
    ticker: "",
    tickers: []
  }

  handleSubmit = value => {
    const ticker = value;
    this.setState({
      ticker,
      tickers: [...this.state.tickers, ticker]
    });
    this.getTickerInfo(ticker);
  }

  mapTickerData = tickerData => {
    return tickerData.map(dataPoint => dataPoint.close);
  }

  getTickerInfo = ticker => {
    // Make API call
    fetch(getUrl(ticker))
      .then(res => res.json())
      .then(
        result => {
          // Massage Data
          const tickerData = this.mapTickerData(result);
          const date = {};
          if (!this.state.data.date) {
            date.date = result.map(x => x.date);
          }
          // Put data into state
          this.setState({data: {...this.state.data, ...date, [ticker]: tickerData}});
        },
        error => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <div className="container">
        <SearchBarContainer
          name={this.state.ticker}
          handleSubmit={this.handleSubmit}
        />
        <div className="second-row">
          <ChartContainer
            data={this.state.data}
            keys={this.state.tickers}
          />
          <ListContainer
            items={this.state.tickers}
          />
        </div>  
      </div>
    );
  }
}

export default StockTracker;
