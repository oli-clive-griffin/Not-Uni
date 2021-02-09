import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class MessageSaved extends React.Component {
  render () {
    return (
      <div className= 'message'>
        <div className='message-heading'>
        </div>
        <div className='message-content'>
          <span><img src="/images/tick.svg" alt="tick"/></span><h3> This Module has been saved to your profile</h3>
        </div>
      </div>
    )
  }
}

export default MessageSaved
