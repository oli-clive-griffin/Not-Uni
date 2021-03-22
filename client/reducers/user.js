import { SET_SAVED_MODULES_FROM_DATA_BASE, SET_USER, ADD_TO_SAVED_MODULES } from '../actions'
import { REMOVE_USER } from '../actions/authenticated'
const initialState = 
 {

}


const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER:
      return {...state, ...action.user}
    case REMOVE_USER:
      return {}
    case SET_SAVED_MODULES_FROM_DATA_BASE:
      let preSavedModuleState = state

      preSavedModuleState.saved = []

      action.modules.map((item) => {
        preSavedModuleState.saved.push(item.id)
      })

      return preSavedModuleState
    // case ADD_TO_SAVED_MODULES:
    //   let preAddToSavedModuleState = state
    //   preAddToSavedModuleState.saved.push(action.module)
    //   return preAddToSavedModuleState

      default:
        return state
  }
}

export default reducer