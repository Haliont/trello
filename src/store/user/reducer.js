import { combineActions, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as userActions from './actions';

const username = handleActions({
  [combineActions(
    userActions.signInSuccess,
    userActions.signUpSuccess,
  )](_, { payload }) {
    return payload;
  },
}, '');

const isSignedIn = handleActions({
  [combineActions(
    userActions.signInSuccess,
    userActions.signUpSuccess,
  )]() {
    return true;
  },
  [combineActions(
    userActions.signInFailure,
    userActions.signUpFailure,
    userActions.signOut,
  )]() {
    return false;
  },
}, '');

const signingInState = handleActions({
  [userActions.signInRequest]() {
    return 'requested';
  },
  [userActions.signInSuccess]() {
    return 'success';
  },
  [userActions.signInFailure]() {
    return 'failed';
  },
}, 'none');

const signingUpState = handleActions({
  [userActions.signUpRequest]() {
    return 'requested';
  },
  [userActions.signUpSuccess]() {
    return 'success';
  },
  [userActions.signUpFailure]() {
    return 'failed';
  },
}, 'none');

export default combineReducers({
  isSignedIn,
  username,
  signingInState,
  signingUpState,
});
