import { createLogic } from 'redux-logic';
import { updateDate, updateTickerRange, clearData } from '../actions';
import { getUrl, mapTickerData } from '../utils';

export const updateDateRangeLogic = createLogic({
  type: 'UPDATE_DATE_RANGE',
  debounce: 500, /* ms */
  latest: true,  /* take latest only */

  validate({ getState, action }, allow, reject) {
    allow(action);
  },

  process({ getState, action }, dispatch, done) {
    const state = getState();
    let isNewDate = true;
    const tickers = state.tickers;
    if (tickers.length > 0) {
      dispatch(clearData());
    }
    for (let ticker of tickers) {
      // Make API call
      fetch(getUrl(ticker, action.dateRange))
        .then(res => res.json())
        .then(
          result => {
            // Massage Data
            if (isNewDate) {
              const date = mapTickerData(result, "date");
              dispatch(updateDate(date));
              isNewDate = false;
            }
            
            const tickerData = mapTickerData(result, "close");
            dispatch(updateTickerRange(ticker, tickerData));
          },
          error => {
            console.warn(error);
          }
        );
      }
    }
});

export default [
  updateDateRangeLogic
];
