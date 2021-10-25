import {combineReducers} from 'redux';
import { isLoadingReducer } from './loadingReducer';
import { isUserLoginReducer } from './loginReducer';
import newsReducer from './newsReducer';
import { notificationDataReducer } from './notificationReducer';
import { toggleMenuReducer } from './toggleMenuReducer';
import { userDataReducer } from './userDataReducer';

const rootReducer = combineReducers({
  newsDetails: newsReducer,
  loading: isLoadingReducer,
  userData: userDataReducer,
  login: isUserLoginReducer,
  notification: notificationDataReducer,
  menuToggle: toggleMenuReducer
})

export default rootReducer;