import {combineReducers} from 'redux'
import dashboard from './dashboard'
import colors from './colors'
import config from './config'
import leftSidebar from './left-sidebar'
import palettes from './palettes'
import navigation from './navigation'
import newsReducer from '../redux/reducers/newsReducer'
import { isLoadingReducer } from '../redux/reducers/loadingReducer'
import { userDataReducer } from '../redux/reducers/userDataReducer'
import { isUserLoginReducer } from '../redux/reducers/loginReducer'
import { notificationDataReducer } from '../redux/reducers/notificationReducer'
import { toggleMenuReducer } from '../redux/reducers/toggleMenuReducer'

const rootReducer = combineReducers({
  dashboard,
  navigation,
  colors,
  config,
  leftSidebar,
  palettes,
  newsDetails: newsReducer,
  loading: isLoadingReducer,
  userData: userDataReducer,
  login: isUserLoginReducer,
  notification: notificationDataReducer,
  menuToggle: toggleMenuReducer
})

export default rootReducer
