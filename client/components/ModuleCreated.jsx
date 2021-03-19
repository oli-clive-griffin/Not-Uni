import React from 'react'
import { Link } from 'react-router-dom'

class ModuleCreated extends React.Component {
  render () {
    return (
      <div className='module-created'>
        <div className="module-created-card" >
          <img className="module-created-success" src='/images/tick.svg' alt='success'></img>
          <h1>Success!</h1>
          <span> Your Module Has Been Created</span>
          <Link to="profile"><span> Return To Your Profile</span> </Link>
        </div>
      </div>
    )
  }
}

export default ModuleCreated
