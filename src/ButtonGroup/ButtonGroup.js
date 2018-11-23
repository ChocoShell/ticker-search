import React from 'react';
import './ButtonGroup.css';

const ButtonGroup = props => {
  return (
    <div className="date-range btn-group btn-group-toggle" data-toggle="buttons">
      {
        props.keys.map(key => {
          return (
            <button
              className={`btn btn-outline-secondary ${props.activeValue === key ? "active":null}`}
              key={key} 
              onClick={() => props.handleClick(key)}
            >
              {props.values[key]}
            </button>
          )
        })
      }
    </div>
  )
}

export default ButtonGroup;
