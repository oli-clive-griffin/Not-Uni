import { combineReducers } from 'redux'

import modules from './modules'
import user from './user'
import searchModules from './searchModules'
import savedModules from './savedModules'
import isAuthenticated from './isAuthenticated'
import hasLoaded from './hasLoaded'


export default combineReducers({
  hasLoaded,
  isAuthenticated,
  modules,
  user,
  savedModules,
  searchModules
})
