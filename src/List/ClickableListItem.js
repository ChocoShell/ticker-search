import React from 'react';

class ClickableListItem extends React.Component {
  handleClick = event => {
    event.preventDefault();
    this.props.handleClick(this.props.value);
  }
  render() {
    return (
      <li onClick={this.handleClick} key={this.props.key}>
        {this.props.value}
      </li>
    )
  }
}

export default ClickableListItem;
