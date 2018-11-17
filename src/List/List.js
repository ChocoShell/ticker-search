import React from 'react';
import ClickableListItem from './ClickableListItem';
import './List.css';

const List = props => {
  return (
    <div className="sidebar-outline">
      <h3>{props.title}</h3>
      <hr />
      <ul>
        {props.items.map(item => {
          return <ClickableListItem handleClick={props.handleClick} key={item} value={item} />;
        })}
      </ul>
    </div>
  )
}

export default List;
