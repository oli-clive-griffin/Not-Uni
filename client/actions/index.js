
import { 
  decreaseLikesAPI,
  getAllModulesAPI,
  increaseLikesAPI,
  getSavedModulesAPI,
  addSavedModuleAPI,
  removeSavedModuleAPI,
  createModuleAPI
} from '../apis/modules'

export const SET_MODULES = 'SET_MODULES'
export const SET_SEARCH_MODULES ='SET_SEARCH_MODULES'
export const MODULES_HAVE_LOADED = 'MODULES_HAVE_LOADED'
export const SET_SAVED_MODULES_FROM_DATA_BASE = 'SET_SAVED_MODULES_FROM_DATA_BASE'
export const ADD_SINGLE_MODULE_TO_SAVED_MODULES = 'ADD_SINGLE_MODULE_TO_SAVED_MODULES'
export const REMOVE_SAVED_MODULE = 'REMOVE_SAVED_MODULE'
export const SET_USER = 'SET_USER'
export const SET_LIKES = 'SET_LIKES'
export const DECREASE_LIKES = 'DECREASE_LIKES'
export const INCREASE_LIKES = 'INCREASE_LIKES'

// GET ALL MODULES
export const setModules = (modules) => {
  return {
    type: SET_MODULES,
    modules
  }
}

export const fetchModules = () => {
  return dispatch => {
    return getAllModulesAPI()
      .then(modules=> {
        dispatch(setModules(modules))
      })
      .then(() => dispatch(modulesHaveLoaded(true)))
  }
}

export const modulesHaveLoaded = (boolean) => {
  return {
    type: MODULES_HAVE_LOADED,
    loaded: boolean
  }
}

// ADD TO SAVED MODULES
export const setSingleModuleToSavedModules = (module) => {
  return {
    type:ADD_SINGLE_MODULE_TO_SAVED_MODULES,
    module
  }
}

export const addSavedModules = (userID, moduleID) => {
  return dispatch => {
    return addSavedModuleAPI(userID, moduleID)
      .then((module)=>
        {
        return dispatch(setSingleModuleToSavedModules(module))
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  // REMOVE SAVED MODULE
  export const removeSingleModuleFromSavedModules = (id) => {
    return {
      type:REMOVE_SAVED_MODULE,
      id
    }
  }
  
  export const removeSavedModule = (savedModuleID) => {
    return dispatch => {
      return removeSavedModuleAPI(savedModuleID)
        .then(()=>
          {
          return dispatch(removeSingleModuleFromSavedModules(savedModuleID))
        })
        .catch(err => {
          console.log(err)
        })
      }
    }

// SET SEARCHED MODULES
export const setSearchedModules = (modules) =>{
  return{
    type: SET_SEARCH_MODULES,
    modules
  }
}

// GET SAVED MODULES
export const setSavedModulesFromDatabase = (modules) => {
  return {
    type:SET_SAVED_MODULES_FROM_DATA_BASE,
    modules: modules
  }
}

export const fetchSavedModules = (userID) => {
  return dispatch => {
    return getSavedModulesAPI(userID)
      .then(modules=>
        {
        return dispatch(setSavedModulesFromDatabase(modules))
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
  
export const setUser = (user) => {
  return {
    type: SET_USER,
    user: user
  }
}

// Update Module Likes
export const increaseLikes = (module) => {
  return {
    type: INCREASE_LIKES,
    module
  }
}

export const increaseModuleLikes = (module) => {
  return dispatch => {
    return increaseLikesAPI(module)
    .then(()=> {
      dispatch(increaseLikes(module))
    })
    .catch(err => {
      console.log(err)
      })
    }
}

export const decreaseLikes = (module) => {
  return {
    type: DECREASE_LIKES,
    module
  }
}

export const decreaseModuleLikes = (module) => {
  return dispatch => {
    return decreaseLikesAPI(module)
    .then(()=> {
      dispatch(decreaseLikes(module))
    })
    .catch(err => {
      console.log(err)
      })
    }
}
