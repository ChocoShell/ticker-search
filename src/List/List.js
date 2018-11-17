import React from 'react';
import './List.css';

function List(props) {
  return (
    <div className="sidebar-outline">
      <h3>Ticker Sidebar</h3>
      <hr />
      <ul>
        {props.items.map(item => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  )
}

export default List;
