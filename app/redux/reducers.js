import user from './user';
import services from './services';
import app from './app';
import {combineReducers} from 'redux';

export default combineReducers({
  user,
  services,
  app,
});
