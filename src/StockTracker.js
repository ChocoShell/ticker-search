import React, { Component } from 'react';
import ListContainer from './List/ListContainer';
import SearchBarContainer from './SearchBar/SearchBarContainer';
import ChartContainer from './Chart/ChartContainer';
import "./StockTracker.css";
import {getUrl} from './utils';

class StockTracker extends Component {
  constructor() {
    super();
    this.dateRanges = {
      "1d": "One Day",
      "1m": "One Month",
      "3m": "Three Months",
      "6m": "Six Months",
      "ytd": "Year to Date",
    };
    this.dateRangeKeys = Object.keys(this.dateRanges);
  }

  state = {
    data: {},
    tickers: [],
    normalize: false,
    selectedRange: "1m",
    searchBarTitle: "Ticker",
    searchError: null,    
    sidebarTitle: "Tickers Shown"
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.state.selectedRange !== prevState.selectedRange) {
      this.fetchAllData();
    }
  }

  mapTickerData = (tickerData, key) => {
    return tickerData.map(dataPoint => dataPoint[key]);
  }

  getTickerInfo = (ticker, clearData) => {
    // Make API call
    fetch(getUrl(ticker, this.state.selectedRange))
      .then(res => res.json())
      .then(
        result => {
          // Massage Data
          const tickerData = this.mapTickerData(result, "close");
          const dateData = {};
          if (!this.state.data.date || clearData) {
            dateData.date = this.mapTickerData(result, "date");
          }
          const tickers = [...this.state.tickers];
          if(!this.state.tickers.includes(ticker)) {
            tickers.push(ticker);
          }
          // Put data into state
          const data = {...this.state.data, ...dateData, [ticker]: tickerData};
          this.setState({
            data,
            tickers
          });
        },
        error => {
          console.warn(error);
          this.setState({searchError: `Could not find ticker: ${ticker}`});
        }
      );
  }

  fetchAllData = () => {
    this.state.tickers.map(ticker => this.getTickerInfo(ticker, true));
  }

  handleSearchSubmit = value => {
    if (this.state.tickers.includes(value)) {
      this.setState({searchError: `${value} already displayed.`});
    } else {
      this.setState({searchError: null});
      this.getTickerInfo(value, false);
    }
  }

  handleDateClick = newDateRange => {
    this.setState({selectedRange: newDateRange});
  }

  handleTickerClick = value => {
    const data = {...this.state.data};
    delete data[value];

    this.setState({
      tickers: this.state.tickers.filter( a => a !== value),
      data
    });
  }

  handleNormalizeClick = () => {
    this.setState({normalize: !this.state.normalize});
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
          <button className="normalize" onClick={this.handleNormalizeClick}>
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
        <div className="date-range">
          {
            this.dateRangeKeys.map(date => {
              return (
                <button key={date} onClick={() => this.handleDateClick(date)}>
                  {this.dateRanges[date]}
                </button>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default StockTracker;
