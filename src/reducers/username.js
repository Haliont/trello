import { createAction, handleActions } from 'redux-actions';

export const updateUsername = createAction('UPDATE_USERNAME');

export default handleActions({
  [updateUsername](_, { payload: newName }) {
    return newName;
  },
}, '');
