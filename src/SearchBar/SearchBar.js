import React from 'react';
import './SearchBar.css';

function SearchBar(props) {
  return (
    <div className="search">
      <form onSubmit={props.handleSubmit}>
        <label>
          {props.name}:&nbsp;
          <input onChange={props.handleChange} type="text" name={props.name} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div className="error">
        {props.error || <span>&nbsp;&nbsp;</span>}
      </div>
    </div>
  )
}

export default SearchBar;
