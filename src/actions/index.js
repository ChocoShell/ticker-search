import { pickColor } from '../utils';

export const addTicker = ({ticker, folder, color, data}) => ({
  type: 'ADD_TICKER',
  color: color || pickColor(),
  folder: folder || 'default',
  ticker,
  data
});

export const clearData = () => ({
  type: 'CLEAR_DATA'
});

export const deleteTicker = ticker => ({
  type: 'DELETE_TICKER',
  ticker
});

export const searchTicker = ticker => ({
  type: 'SEARCH_TICKER',
  ticker
});

export const setError = error => ({
  type: 'SET_ERROR',
  error
});

export const updateTickerRange = (ticker, data) => ({
  type: 'UPDATE_TICKER_RANGE',
  ticker,
  data
});

export const updateData = (data) => ({
  type: 'UPDATE_DATA',
  ...data
});

export const updateDate = date => ({
  type: 'UPDATE_DATE',
  date
});

export const updateDateRange = dateRange => ({
  type: 'UPDATE_DATE_RANGE',
  dateRange
});

export const toggleNormalize = () => ({
  type: 'TOGGLE_NORMALIZE'
});
