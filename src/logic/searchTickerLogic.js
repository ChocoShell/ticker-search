import { createLogic } from 'redux-logic';
import { updateDate, setError, addTicker } from '../actions';
import { getUrl, mapTickerData } from '../utils';

export const searchTickerLogic = createLogic({
  type: 'SEARCH_TICKER',
  debounce: 500, /* ms */
  latest: true,  /* take latest only */

  process({ getState, action }, dispatch, done) {
    const state = getState();
    const tickers = state.tickers;
    const dateRange = state.dateRange;
    const ticker = action.ticker;
    let isNewDate = true;
    if (tickers.includes(ticker)) {
      dispatch(setError(`${ticker} already displayed.`)).then(done);
    } else {
      dispatch(setError(null));
      fetch(getUrl(ticker, dateRange))
      .then(res => res.json())
      .then(
        result => {
          // Massage Data
          const tickerData = mapTickerData(result, "close");
          if (isNewDate) {
            const date = mapTickerData(result, "date");
            dispatch(updateDate(date));
            isNewDate = false;
          }
          
          dispatch(addTicker({ticker, data: tickerData}));
        },
        error => {
          console.warn(error);
          dispatch(setError(`Could not find ticker: ${ticker}`));
        }
      ).then(done);
    }
  }
});

export default [
  searchTickerLogic
];
