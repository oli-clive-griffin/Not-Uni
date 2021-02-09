import React from 'react'
import { connect } from 'react-redux'
import { addCommentAPI } from '../apis/modules'
import { fetchModules } from '../actions'


class AddComment extends React.Component {

  state = {
    text: ""
  }

  textHandler = (evt) => {
    this.setState({
      text: evt.target.value
    })
  }

  sumbitHandler = () => {
    const comment = {
      content: this.state.text,
      userName: this.props.user.userName
    }

    const moduleID = this.props.moduleID

    addCommentAPI(moduleID, comment)
      .then(() => {
    
        this.props.dispatch(fetchModules())
      })
  }

  render (){ 
    return (
      <div className="add-comment">
        <h1 className = 'title'> Add Your Comment </h1>
        <textarea rows='2' cols='70' onChange={this.textHandler} className="add-comment-input" value={this.state.text} placeholder="place a comment..." />
        <div className="button submit" onClick={this.sumbitHandler}> Post Comment </div>
      </div>
      
    )
  }
}

function mapStateToProps (globalState) {
  return {
    user: globalState.user,
    modules: globalState.modules
  }
}

export default connect(mapStateToProps)(AddComment)
