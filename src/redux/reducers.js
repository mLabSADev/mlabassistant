import user from './user';
import services from './services';
import {combineReducers} from 'redux';

export default combineReducers({
  user,
  services,
});
