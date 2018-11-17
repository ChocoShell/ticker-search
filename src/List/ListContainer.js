import React, { Component } from 'react';
import List from './List';

class ListContainer extends Component {
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
      <List
        items={this.props.items}
        handleClick={this.props.handleClick}
      />
    )
  }
}

export default ListContainer;
