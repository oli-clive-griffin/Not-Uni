import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateFirebasePassword } from '../actions/authenticated'

const EditProfile = (props) => {
  const [password, setPassword] = useState('')
  const [confirmationPassword, setconfirmationPassword] = useState('')
  const [error, setError] = useState('')

  function submit(e){
    e.preventDefault()
  
    if(password === confirmationPassword){
      try{
       updateFirebasePassword(password, props.sidebarClickHandler,setError)
      }catch (e) {
      console.log(e)
      setError("Failed to edit")
      return "Failed to registrate"
     }
    }else {
      setError("Passwords do not match")
      setconfirmationPassword('')
      setPassword('')
    }
  }

    return (
      <>
      {props.hasLoaded && 
      <>
      <h1>{error}</h1>
      <div className='Register-card'>
        <form onSubmit={submit}>
        <input className='Input-R' type="password"name="password"  onChange={e => setPassword(e.target.value)}  value={password} placeholder="password"/>
        <input className='Input-R' type="password" name="passwordConfirm" onChange={e => setconfirmationPassword(e.target.value)} value={confirmationPassword} placeholder="password-confirmation"/>
        <input className='button' type='submit' value='Edit'/>
        </form>
        <a><p className='link' type='submit' onClick={() => props.sidebarClickHandler("edit")}>Edit profile</p></a>
        <a><p className='link' type='submit' onClick={() => props.sidebarClickHandler("avatar")}>Edit avatar</p></a>
      </div>
      </>
      }
      </>
    )
}

function mapStateToProps(globalState) {
  return {
    dispatch: globalState.dispatch,
    hasLoaded: globalState.hasLoaded.authHasLoaded,
    user: globalState.user,
    modules: globalState.modules,
    savedModules: globalState.savedModules,
    hasLoaded: globalState.hasLoaded
  }
}

export default connect(mapStateToProps)(EditProfile)
