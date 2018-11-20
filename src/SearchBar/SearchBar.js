import React from 'react';
import './SearchBar.css';

const SearchBar = props => {
  return (
    <div className="search">
      <form className="form-inline" onSubmit={props.handleSubmit}>
        <div className="form-group">
          <label for="InputTicker">{props.name}:</label>
          <input onChange={props.handleChange} name={props.name} type="text" className="form-control mx-sm-2" id="InputTicker" aria-describedby="tickerHelp" placeholder="Enter Symbol" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className="error">
        {props.error || <span>&nbsp;&nbsp;</span>}
      </div>
    </div>
  )
}

export default SearchBar;
