import { createAction } from 'redux-actions';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const signInRequest = createAction('SIGN_IN_REQUEST');
export const signInSuccess = createAction('SIGN_IN_SUCCESS');
export const signInFailure = createAction('SIGN_IN_FAILURE');

export const signUpRequest = createAction('SIGN_UP_REQUEST');
export const signUpSuccess = createAction('SIGN_UP_SUCCESS');
export const signUpFailure = createAction('SIGN_UP_FAILURE');

export const signOut = createAction('SIGN_OUT');

export const signIn = (/* values */) => async (dispatch) => {
  dispatch(signInRequest());
  try {
    await sleep(2000);
    dispatch(signInSuccess('Земляков Константин'));
  } catch (e) {
    dispatch(signInFailure());
  }
};

/* eslint-disable */
export const signUp = ({ first_name, last_name }) => async (dispatch) => {
  dispatch(signUpRequest());
  try {
    await sleep(2000);
    dispatch(signUpSuccess(`${first_name} ${last_name}`));
  } catch (e) {
    dispatch(signUpFailure());
  }
};
