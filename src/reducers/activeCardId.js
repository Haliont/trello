import { createAction, handleActions } from 'redux-actions';

export const openCard = createAction('OPEN_CARD');
export const closeCard = createAction('CLOSE_CARD');

export default handleActions({
  [openCard](_, { payload: id }) {
    return id;
  },
  [closeCard]() {
    return null;
  },
}, null);
