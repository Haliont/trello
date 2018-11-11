import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const username = handleActions({
  [actions.updateUsername](_, { payload: { newName } }) {
    return newName;
  },
}, '');

const lists = handleActions({
  [actions.setListTitle](state, { payload: { id, title } }) {
    return { ...state, [id]: { ...state[id], title } };
  },
}, {});

export default combineReducers({
  lists,
  username,
});
