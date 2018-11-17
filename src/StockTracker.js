import React, { Component } from 'react';
import ListContainer from './List/ListContainer';
import SearchBarContainer from './SearchBar/SearchBarContainer';
import ChartContainer from './Chart/ChartContainer';
import "./StockTracker.css";
import {getUrl} from './utils';

class StockTracker extends Component {
  state = {
    data: {},
    tickers: [],
    normalize: false,
    searchBarTitle: "Ticker",
    searchError: null,    
    sidebarTitle: "Tickers Shown"
  }

  handleSearchSubmit = value => {
    if (this.state.tickers.includes(value)) {
      this.setState({searchError: `${value} already displayed.`});
    } else {
      this.setState({searchError: null});
      this.getTickerInfo(value);
    }
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

  mapTickerData = (tickerData, key) => {
    return tickerData.map(dataPoint => dataPoint[key]);
  }

  getTickerInfo = ticker => {
    // Make API call
    fetch(getUrl(ticker))
      .then(res => res.json())
      .then(
        result => {
          // Massage Data
          const tickerData = this.mapTickerData(result, "close");
          const dateData = {};
          if (!this.state.data.date) {
            dateData.date = this.mapTickerData(result, "date");
          }
          // Put data into state
          this.setState({
            data: {...this.state.data, ...dateData, [ticker]: tickerData},
            tickers: [...this.state.tickers, ticker]
          });
        },
        error => {
          console.log(error);
          this.setState({searchError: `Could not find ticker: ${ticker}`})
        }
      );
  }

  render() {
    return (
      <div className="container">
        <div className="second-row">
          <SearchBarContainer
            error={this.state.searchError}
            handleSubmit={this.handleSearchSubmit}
            name={this.state.searchBarTitle}
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
            handleClick={this.handleTickerClick}
            items={this.state.tickers}
            title={this.state.sidebarTitle}
          />
        </div>  
      </div>
    );
  }
}

export default StockTracker;
