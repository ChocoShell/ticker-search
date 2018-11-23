import initialState from './initialState';

const tickers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TICKER':
      return {
        ...state,
        tickers: [...state.tickers, action.ticker],
        colors: {
          ...state.colors,
          [action.ticker]: action.color
        },
        chartData: {
          ...state.chartData,
          [action.ticker]: {
            data: action.data,
            folder: action.folder  
          }
        }
      }
    case 'CLEAR_DATA': {
      const tickers = state.tickers;
      const newState = {...state};
      for (let ticker of tickers) {
        newState.chartData[ticker].data = [];
      }
      return newState;
    }
    case 'SET_ERROR':
      return {...state, error: action.error};
    case 'DELETE_TICKER': {
      const chartData = {
        ...state.chartData
      };
      delete chartData[action.ticker];

      const colors = {
        ...state.colors
      };
      delete colors[action.ticker];

      return {
        ...state,
        chartData,
        colors,
        tickers: state.tickers.filter(ticker => ticker !== action.ticker)
      }
    }
    case 'UPDATE_TICKER_RANGE': {
      const newState = {...state};
      newState.chartData[action.ticker].data = action.data;
      return newState;
    }
    case 'UPDATE_DATA': {
      console.log(action);
      const newState = {...state};
      newState.date = action.date;
      const tickers = Object.keys(action.tickersData);
      for (let ticker of tickers) {
        newState.chartData[ticker] = action.tickersData[ticker]
      };
      return newState;
    }
    case 'UPDATE_DATE':
      return {
        ...state,
        date: action.date
      }
    case 'UPDATE_DATE_RANGE':
      return {
        ...state,
        dateRange: action.dateRange
      }
    case 'TOGGLE_NORMALIZE':
      return {
        ...state,
        normalize: !state.normalize
      }
    default:
      return state
  }
}

export default tickers;
