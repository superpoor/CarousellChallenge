import { combineReducers } from 'redux'

import topicsReducer from './topics'
import { mainNavReducer } from '../routes/MainRouter'

export default combineReducers({
  topics: topicsReducer,
  mainNav: mainNavReducer
})