import React, { Component } from 'react';
import TickerSearch from './TickerSearch';

class TickerSearchContainer extends Component {
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
      <TickerSearch
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        value={this.state.value}
        name={this.state.name}
      />
    )
  }
}

export default TickerSearchContainer;