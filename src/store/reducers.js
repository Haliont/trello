import { combineReducers } from 'redux';
import user from './user/reducer';
import boards from './boards/reducer';
import cards from './cards/reducer';
import comments from './comments/reducer';

export default combineReducers({
  user,
  cards,
  boards,
  comments,
});
