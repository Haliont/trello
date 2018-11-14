import { createAction, handleActions } from 'redux-actions';

export const signup = createAction('SIGNUP');

export default handleActions({
  [signup]() {
    return true;
  },
}, false);
