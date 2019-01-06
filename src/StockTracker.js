import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SidebarContainer from './Sidebar/SidebarContainer';
import SearchBarContainer from './SearchBar/SearchBarContainer';
import ChartContainer from './Chart/ChartContainer';
import DateRangeButtonGroup from './ButtonGroup/ButtonGroupContainer';
import {
  addTicker,
  searchTicker,
  setError,
  updateDate,
  updateTickerRange,
  updateDateRange,
  toggleNormalize
} from './actions';

import "./StockTracker.css";


class StockTracker extends Component {
  constructor() {
    super();
    this.sidebarTitle = "Tickers Shown";
    this.searchBarTitle = "Ticker";
  }

  componentDidMount(){
    this.props.searchTicker('SPY');
  }

  render() {
    return (
      <div className="container">
        <div className="my-row">
          <SearchBarContainer
            error={this.props.error}
            handleSubmit={this.props.searchTicker}
            name={this.searchBarTitle}
          />
          <button className="normalize btn btn-primary" onClick={this.props.toggleNormalize}>
            {this.props.normalize ? "Prices?": "Cumulative Return?"}
          </button>
        </div>
        <div className="my-row">
          <ChartContainer />
          <SidebarContainer
            title={this.sidebarTitle}
          />
        </div>
        <div className="my-row">
          <DateRangeButtonGroup />
        </div>  
      </div>
    );
  }
}

StockTracker.propTypes = {
  searchTicker: PropTypes.func.isRequired,
  updateDate: PropTypes.func.isRequired,
  updateDateRange: PropTypes.func.isRequired,
  addTicker: PropTypes.func.isRequired,
  toggleNormalize: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tickers: state.tickers,
  normalize: state.normalize,
  dateRange: state.dateRange,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  addTicker: tickerData => dispatch(addTicker(tickerData)),
  searchTicker: ticker => dispatch(searchTicker(ticker)),
  setError: error => dispatch(setError(error)),
  toggleNormalize: () => dispatch(toggleNormalize()),
  updateDate: date => dispatch(updateDate(date)),
  updateDateRange: dateRange => dispatch(updateDateRange(dateRange)),
  updateTickerRange: (ticker, data) => dispatch(updateTickerRange({ticker, data}))
});

export default connect(mapStateToProps, mapDispatchToProps)(StockTracker);
