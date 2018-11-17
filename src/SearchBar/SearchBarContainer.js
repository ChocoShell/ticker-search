import React, { Component } from 'react';
import SearchBar from './SearchBar';

class SearchBarContainer extends Component {
  state = {
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
      <SearchBar
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        value={this.state.value}
        name={this.props.name}
      />
    )
  }
}

export default SearchBarContainer;