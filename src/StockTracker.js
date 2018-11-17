import React, { Component } from 'react';
import ListContainer from './List/ListContainer';
import SearchBarContainer from './SearchBar/SearchBarContainer';
import ChartContainer from './Chart/ChartContainer';
import "./StockTracker.css";
import {getUrl} from './utils';

class StockTracker extends Component {
  state = {
    data: {},
    searchBarTitle: "Ticker",
    tickers: [],
    normalize: false
  }

  handleSubmit = value => {
    const ticker = value;
    this.setState({
      ticker,
      tickers: [...this.state.tickers, ticker]
    });
    this.getTickerInfo(ticker);
  }

  handleTickerClick = value => {
    const data = {...this.state.data};
    delete data[value];

    this.setState({
      tickers: this.state.tickers.filter( a => a !== value),
      data
    })
  }

  handleNormalizeClick = () => {
    this.setState({normalize: !this.state.normalize});
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
        <div className="second-row">
          <SearchBarContainer
            name={this.state.searchBarTitle}
            handleSubmit={this.handleSubmit}
          />
          <button onClick={this.handleNormalizeClick}>
            {this.state.normalize ? "Unnormalize?": "Normalize?"}
          </button>
        </div>
        <div className="second-row">
          <ChartContainer
            data={this.state.data}
            keys={this.state.tickers}
            normalize={this.state.normalize}
          />
          <ListContainer
            items={this.state.tickers}
            handleClick={this.handleTickerClick}
          />
        </div>  
      </div>
    );
  }
}

export default StockTracker;
