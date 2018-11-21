import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SidebarContainer from './Sidebar/SidebarContainer';
import SearchBarContainer from './SearchBar/SearchBarContainer';
import ChartContainer from './Chart/ChartContainer';
import { getUrl, pickColor } from './utils';
import { addTicker, addDate } from './actions';
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
  }

  state = {
    colors: {},
    data: {},
    tickers: [],
    normalize: false,
    selectedDateRange: "1m",
    searchBarTitle: "Ticker",
    searchError: null,    
    sidebarTitle: "Tickers Shown"
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedDateRange !== prevState.selectedDateRange) {
      this.state.tickers.map(ticker => this.getTickerInfo(ticker, true));
    }
  }

  mapTickerData = (tickerData, key) => {
    return tickerData.map(dataPoint => dataPoint[key]);
  }

  getTickerInfo = (rawTicker, clearData) => {
    const ticker = rawTicker.toUpperCase();
    // Make API call
    fetch(getUrl(ticker, this.state.selectedDateRange))
      .then(res => res.json())
      .then(
        result => {
          // Massage Data
          const tickerData = this.mapTickerData(result, "close");
          const dateData = {};
          if (!this.state.data.date || clearData) {
            dateData.date = this.mapTickerData(result, "date");
            this.props.addDate({date: dateData.date});
          }
          const tickers = [...this.state.tickers];
          const colors = {...this.state.colors};

          tickers.push(ticker);
          colors[ticker] = pickColor();
          const data = {...this.state.data, ...dateData, [ticker]: tickerData};
          
          this.props.addTicker({ticker, color: colors[ticker], data: tickerData});

          // Put data into state
          // Put this part into redux
          this.setState({
            data,
            tickers,
            colors
          });
        },
        error => {
          console.warn(error);
          this.setState({searchError: `Could not find ticker: ${ticker}`});
        }
      );
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
    this.setState({selectedDateRange: newDateRange});
  }

  handleTickerClick = value => {
    const data = {...this.state.data};
    delete data[value];
    const colors = {...this.state.colors};
    delete colors[value];
    this.setState({
      tickers: this.state.tickers.filter( a => a !== value),
      colors,
      data
    });
  }

  handleNormalizeClick = () => {
    console.log(this.props.data);
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
          <button className="normalize btn btn-primary" onClick={this.handleNormalizeClick}>
            {this.state.normalize ? "Unnormalize?": "Normalize?"}
          </button>
        </div>
        <div className="second-row">
          <ChartContainer
            data={this.state.data}
            keys={this.state.tickers}
            normalize={this.state.normalize}
            colors={this.state.colors}
          />
          <SidebarContainer
            handleClick={this.handleTickerClick}
            items={this.state.tickers}
            title={this.state.sidebarTitle}
            colors={this.state.colors}
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
  addDate: PropTypes.func.isRequired,
  addTicker: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  addTicker: tickerData => dispatch(addTicker(tickerData)),
  addDate: date => dispatch(addDate(date))
});

export default connect(null, mapDispatchToProps)(StockTracker);
