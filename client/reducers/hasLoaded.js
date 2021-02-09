import {AUTHENTICATION_HAS_LOADED} from '../actions/authenticated'
import {MODULES_HAVE_LOADED} from '../actions/index'

const intialState = {modulesHaveLoaded:false, authHasLoaded: false}

const reducer = (state = intialState, action) => {
  switch(action.type){
    case AUTHENTICATION_HAS_LOADED:
      let authState = {...state}
      authState.authHasLoaded = action.loaded
      return authState
    case MODULES_HAVE_LOADED:
      let moduleState = {...state}
      moduleState.modulesHaveLoaded = action.loaded
      return moduleState
    default:
      return state
  }
}

export default reducer