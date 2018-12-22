import { createSelector } from 'reselect';

export const getUser = state => state.user;

export const getUsername = createSelector(
  getUser,
  user => user.username,
);

export const isSignedIn = createSelector(
  getUser,
  user => user.isSignedIn,
);

export const isSigningIn = createSelector(
  getUser,
  user => user.signingInState === 'requested',
);

export const isSigningUp = createSelector(
  getUser,
  user => user.signingUpState === 'requested',
);
