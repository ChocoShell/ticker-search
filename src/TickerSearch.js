import React from 'react';
import './TickerSearch.css';

function TickerSearch(props) {
  return (
    <div className="search">
      <form onSubmit={props.handleSubmit}>
        <label>
          {props.name}:
          <input onChange={props.handleChange} type="text" name={props.name} />
        </label>
        <input type="submit" value="Submit" />
      </form> 
    </div>
  )
}

export default TickerSearch;
