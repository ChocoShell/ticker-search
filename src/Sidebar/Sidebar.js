import React from 'react';
import PropTypes from 'prop-types';
import Folder from './Folder';
import './Sidebar.css';

const Sidebar = props => {
  return (
    <div className="sidebar-outline">
      <h3>{props.title}</h3>
      <hr />
      <Folder
        colors={props.colors}
        handleClick={props.handleClick}
        items={props.items}
      />
    </div>
  )
}

Sidebar.propTypes = {
  colors: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

export default Sidebar;
