const tickers = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TICKER':
      return [
        ...state,
        {
          ticker: action.ticker,
          folder: action.folder,
          color: action.color,
          data: action.data
        }
      ]
    case 'ADD_DATE':
      return [
        ...state,
        {date: action.date}
      ]
    default:
      return state
  }
}

export default tickers;
