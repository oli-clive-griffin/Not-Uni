import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateFirebase } from '../actions/authenticated'

const EditProfile = (props) => {
  const [userName, setUserName] = useState(props.user.userName)
  const [email, setEmail] = useState(props.user.email)
  const [error, setError] = useState('')
  const [pokemon, setPokemon] = useState(0)

  function submit(e){
    e.preventDefault()
      try{
        props.dispatch(updateFirebase(userName, email , pokemon, props.sidebarClickHandler))
      }catch (e) {
      console.log(e)
      // setError("Failed to edit")
      return "Failed to registrate"
     }
  }

    return (
      <>
      {props.hasLoaded && 
      <>
      <h1>{error}</h1>
      <div className='Register-card'>
        <form onSubmit={submit}>
        <label>
        Avatar
        <input className='Input-R' type="number" max='898' min='0' onChange={e => setPokemon(e.target.value)} value={pokemon}/>
        </label>
        <input className='button' type='submit' value='Edit'/>
        </form>
        
      {pokemon && <img className='pokemon' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`}/>}

        <a><p className='link' type='submit' onClick={() => props.sidebarClickHandler("edit")}>Edit profile</p></a>
        <a><p className='link' type='submit' onClick={() => props.sidebarClickHandler("password")}>Edit password</p></a>
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
