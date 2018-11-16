import React, { Component } from 'react';
import TickerSidebar from './TickerSidebar';

class TickerSidebarContainer extends Component {
  state = {
    name: "Ticker",
    value: ""
  }

  handleChange = event => {
    this.setState({value: event.target.value});
    event.preventDefault();
  }

  handleSubmit = event => {
    this.props.handleSubmit(this.state.value);
    event.preventDefault();
  }
  
  render() {
    return (
      <TickerSidebar
        tickers={this.props.tickers}
      />
    )
  }
}

export default TickerSidebarContainer;
