import {  COMMENT_MODULES } from '../actions'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_MODULES:
      return action.comment
    default:
      return state
  }
}

export default reducer
