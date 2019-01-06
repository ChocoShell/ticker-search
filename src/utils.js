export const getUrl = (ticker, dateRange) => `https://api.iextrading.com/1.0/stock/${ticker}/chart/${dateRange}`;

const baseColors = [
  "#82ca9d", "#8084d8", "#8be07f", "#d884d4",
  "#83b5ab", "#84d0d8", "#b284d8", "#d88684"
];

export const pickColor = () => {
  return baseColors[Math.floor(Math.random() * baseColors.length)];
};

export const mapTickerData = (tickerData, key) => {
  return tickerData.map(dataPoint => dataPoint[key]);
};
