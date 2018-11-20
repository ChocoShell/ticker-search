import React from 'react';
import './Sidebar.css';

const styleMaker = color => {
  return {"background-color": color, "border-color": color, color: "black"};
}

const Sidebar = props => {
  return (
    <div className="sidebar-outline">
      <h3>{props.title}</h3>
      <hr />
      <div className="btn-group-vertical list">
        {props.items.map(item => {
          return  (
            <button className="btn btn-success" style={styleMaker(props.colors[item])} key={item} onClick={() => props.handleClick(item)}>
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}


export default Sidebar;
