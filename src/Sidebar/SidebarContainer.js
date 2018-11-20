import React, { Component } from 'react';
import Sidebar from './Sidebar';

class SidebarContainer extends Component {
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
      <Sidebar
        colors={this.props.colors}
        handleClick={this.props.handleClick}
        items={this.props.items}
        title={this.props.title}
      />
    )
  }
}

export default SidebarContainer;
