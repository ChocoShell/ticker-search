import { connect } from 'react-redux';

import { updateDateRange } from '../actions';
import ButtonGroup from './ButtonGroup';
import {dateRanges, dateRangeKeys} from '../constants';

const mapStateToProps = (state, ownProps) => ({
  values: dateRanges,
  keys: dateRangeKeys,
  activeValue: state.dateRange
});

const mapDispatchToProps = dispatch => ({
  handleClick: dateRange => dispatch(updateDateRange(dateRange)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ButtonGroup);
