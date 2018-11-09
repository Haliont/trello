import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const username = handleActions({
  [actions.updateUsername](_, { payload: { newName } }) {
    return newName;
  },
}, '');

export default combineReducers({ username });
