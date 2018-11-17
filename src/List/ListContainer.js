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
        handleClick={this.props.handleClick}
        items={this.props.items}
        title={this.props.title}
      />
    )
  }
}

export default ListContainer;
