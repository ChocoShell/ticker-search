import { pickColor } from '../utils';

export const addTicker = ({ticker, folder, color, data}) => ({
  type: 'ADD_TICKER',
  color: color || pickColor(),
  folder: folder || 'default',
  ticker,
  data
});

export const addDate = ({date}) => ({
  type: 'ADD_DATE',
  date
})