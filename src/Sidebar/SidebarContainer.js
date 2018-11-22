import { connect } from 'react-redux';

import { deleteTicker } from '../actions';
import Sidebar from './Sidebar';

const mapStateToProps = (state, ownProps) => ({
  title: ownProps.title,
  items: state.tickers,
  colors: state.colors
});

const mapDispatchToProps = dispatch => ({
  handleClick: ticker => dispatch(deleteTicker(ticker)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
