import { pickColor } from '../utils';

export const addTicker = ({ticker, folder, color, data}) => ({
  type: 'ADD_TICKER',
  color: color || pickColor(),
  folder: folder || 'default',
  ticker,
  data
});

export const deleteTicker = ticker => ({
  type: 'DELETE_TICKER',
  ticker
});

export const updateDate = date => ({
  type: 'UPDATE_DATE',
  date
});

export const updateTickerRange = ({ticker, data}) => ({
  type: 'UPDATE_TICKER_RANGE',
  ticker,
  data
});

export const toggleNormalize = () => ({
  type: 'TOGGLE_NORMALIZE'
});
