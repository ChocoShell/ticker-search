const initialState = {
  chartData: [],
  normalize: false,
  tickers: [],
  date: []
};

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
    case 'UPDATE_TICKER_RANGE':
      return {
        ...state,
        chartData: {
          ...state.chartData,
          [action.ticker]: {
            ...state.chartData[action.ticker],
            data: action.data
          }
        }
      }
    case 'UPDATE_DATE':
      return {
        ...state,
        date: action.date
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
