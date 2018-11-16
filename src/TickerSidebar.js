import React from 'react';
import './TickerSidebar.css';

function TickerSidebar(props) {
  return (
    <div className="sidebar-outline">
      <h3>Ticker Sidebar</h3>
      <hr />
      <ul>
        {props.tickers.map(ticker => {
          return <li key={ticker}>{ticker}</li>;
        })}
      </ul>
    </div>
  )
}

export default TickerSidebar;
