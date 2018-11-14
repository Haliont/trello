import { combineReducers } from 'redux';

import lists from './lists';
import cards from './cards';
import comments from './comments';
import username from './username';
import activeCardId from './activeCardId';
import isRegistered from './isRegistered';

export default combineReducers({
  lists,
  cards,
  comments,
  username,
  activeCardId,
  isRegistered,
});
