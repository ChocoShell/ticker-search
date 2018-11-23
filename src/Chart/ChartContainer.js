import { connect } from 'react-redux';

import Chart from './Chart';

const getFormattedChartData = store => {
  const tickers = store.tickers;
  const normalize = store.normalize;
  const date = store.date;
  let finalData = [];  
  if (tickers && tickers.length > 0) {
    const length = date.length;
    for (let j=0; j < length; j++) {
      const node = {date: date[j]};
      for (let ticker of tickers) {
        if (store.chartData[ticker].data.length === length) {
          if (normalize) {
            node[ticker] = (store.chartData[ticker].data[j]/store.chartData[ticker].data[0]).toFixed(4);
          } else {
            node[ticker] = store.chartData[ticker].data[j];
          }
        }
      }
      finalData.push(node);
    }
  }
  return finalData;
}

const mapStateToProps = state => ({
  data: getFormattedChartData(state),
  keys: state.tickers,
  colors: state.colors
});

export default connect(mapStateToProps, {})(Chart);
