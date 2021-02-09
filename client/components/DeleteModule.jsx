import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import {deleteModule} from '../apis/modules'

function Delete(props) {
  let history = useHistory()
  function submit(){
    try{
        deleteModule(props.module)
          history.push('/')
       } catch (e) {
      console.log(e)
      return "Failed to delete"
     }
  }
  return (
    <div className ="popup">
       <div className="popup-inner">
        <h1>Are you sure you want to delete your module?
          {props.module}
        </h1>
        <button className="button" onClick={() => submit()}>Delete</button>
        <button className="button delete" onClick={() => props.setDelete(false)}>Cancel</button>
        </div>
    </div>
  )
}

export default connect()(Delete)