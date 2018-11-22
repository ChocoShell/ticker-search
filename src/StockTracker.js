import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SidebarContainer from './Sidebar/SidebarContainer';
import SearchBarContainer from './SearchBar/SearchBarContainer';
import ChartContainer from './Chart/ChartContainer';
import { getUrl, pickColor } from './utils';
import {
  addTicker,
  updateDate,
  updateTickerRange,
  toggleNormalize
} from './actions';

import "./StockTracker.css";


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
    this.sidebarTitle = "Tickers Shown";
    this.searchBarTitle = "Ticker";
  }

  state = {
    data: {},
    normalize: false,
    selectedDateRange: "1m",
    searchError: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedDateRange !== prevState.selectedDateRange) {
      this.props.tickers.map(ticker => this.getTickerInfo(ticker, true));
    }
  }

  mapTickerData = (tickerData, key) => {
    return tickerData.map(dataPoint => dataPoint[key]);
  }

  getTickerInfo = (ticker, clearData) => {    
    // Make API call
    fetch(getUrl(ticker, this.state.selectedDateRange))
      .then(res => res.json())
      .then(
        result => {
          // Massage Data
          const tickerData = this.mapTickerData(result, "close");
          if (clearData || !this.props.data || !this.props.data.length) {
            const date = this.mapTickerData(result, "date");
            this.props.updateDate(date);
          }
          
          this.props.addTicker({ticker, color: pickColor(), data: tickerData});
        },
        error => {
          console.warn(error);
          this.setState({searchError: `Could not find ticker: ${ticker}`});
        }
      );
  }

  handleSearchSubmit = value => {
    const ticker = value.toUpperCase();
    if (this.props.tickers.includes(ticker)) {
      this.setState({searchError: `${ticker} already displayed.`});
    } else {
      this.setState({searchError: null});
      this.getTickerInfo(ticker, false);
    }
  }

  handleDateClick = selectedDateRange => {    
    this.setState({selectedDateRange});
  }

  handleNormalizeClick = () => {
    this.props.toggleNormalize();
  }

  render() {
    return (
      <div className="container">
        <div className="second-row">
          <SearchBarContainer
            error={this.state.searchError}
            handleSubmit={this.handleSearchSubmit}
            name={this.searchBarTitle}
          />
          <button className="normalize btn btn-primary" onClick={this.handleNormalizeClick}>
            {this.props.normalize ? "Unnormalize?": "Normalize?"}
          </button>
        </div>
        <div className="second-row">
          <ChartContainer />
          <SidebarContainer
            title={this.sidebarTitle}
          />
        </div>
        <div className="date-range btn-group btn-group-toggle" data-toggle="buttons">
          {
            this.dateRangeKeys.map(date => {
              return (
                <button className={`btn btn-outline-secondary ${this.state.selectedDateRange === date ? "active":null}`} key={date} onClick={() => this.handleDateClick(date)}>
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

StockTracker.propTypes = {
  updateDate: PropTypes.func.isRequired,
  addTicker: PropTypes.func.isRequired,
  toggleNormalize: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tickers: state.tickers,
  normalize: state.normalize
});

const mapDispatchToProps = dispatch => ({
  addTicker: tickerData => dispatch(addTicker(tickerData)),
  toggleNormalize: () => dispatch(toggleNormalize()),
  updateDate: date => dispatch(updateDate(date)),
  updateTickerRange: (ticker, data) => dispatch(updateTickerRange({ticker, data}))
});

export default connect(mapStateToProps, mapDispatchToProps)(StockTracker);
