import React from 'react';
import './Sidebar.css';

const styleMaker = color => {
  return {"backgroundColor": color, "borderColor": color, color: "black"};
}

const Folder = props => {
  return (
    <div className="btn-group-vertical list">
      {props.items.map(item => {
        return  (
          <button className="btn btn-success" style={styleMaker(props.colors[item])} key={item} onClick={() => props.handleClick(item)}>
            {item}
          </button>
        )
      })}
    </div>
  )
}


export default Folder;
