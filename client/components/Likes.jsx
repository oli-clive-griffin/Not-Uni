import React from 'react'
import { connect } from 'react-redux'
import { addSavedModules, decreaseModuleLikes, increaseModuleLikes, removeSavedModule } from '../actions'
import MessageSaved from './MessageSaved'

class Likes extends React.Component {

  state = {
    saved: false,
    savedMessage: false
  }

  componentDidMount() {
    this.setSaved()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.savedModules.length !== this.props.savedModules.length) {
      this.setSaved()
    }
  }

  setSaved = () => {
    this.props.savedModules.map((module) => {
    if (module.id === this.props.module.id) {
    this.setState({
          saved: true,
        })
      }
    })
  }

  clickHandler = () => {
    this.setState({
      saved: (this.state.saved) ? false : true,
    }, () => {
      this.afterSetStateFinished();
      this.setMessage();
    })
  }

  setMessage = () => {
    this.setState({
      savedMessage: (this.state.saved) ? true : false
    });
    setTimeout(function () {
      this.setState({ savedMessage: false });
    }.bind(this), 1300);
  }

  afterSetStateFinished = () => {
    const thisModule = this.props.module
    const alreadySaved = this.props.savedModules.find((module) => {
      return module.module_id === thisModule.id
    })
    if (alreadySaved) {
      this.removeFromSavedModules()
    } else {
      this.addToSavedModules()
    }
  }

  addToSavedModules = () => {
    const userID = this.props.user.uid
    const thisModule = this.props.module

    this.props.dispatch(addSavedModules(userID, thisModule.id))
    this.props.dispatch(increaseModuleLikes(thisModule))
  }

  removeFromSavedModules = () => {
    const thisModule = this.props.module

    this.props.dispatch(removeSavedModule(thisModule.id))
    this.props.dispatch(decreaseModuleLikes(thisModule))
  }

  render() {
    const imageSource = this.state.saved ? "/images/bookmark-white.svg" : "/images/bookmark-border.svg"
    return (
      <div className='likes'>
        <img onClick={() => this.clickHandler()} src={imageSource} alt="like button" />
        {this.state.savedMessage && <MessageSaved />}
      </div>
    )
  }

}

function mapStateToProps(globalState) {
  return {
    modules: globalState.modules,
    user: globalState.user,
    savedModules: globalState.savedModules
  }
}
export default connect(mapStateToProps)(Likes)
