import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import SavedModules from './SavedModules'
import YourModules from './YourModules'
import EditProfile from './EditProfile'
import EditPassword from './EditPassword'
import EditAvatar from './EditAvatar'
import Delete from './UserAuth/Delete'
import { fetchModules } from '../actions'
class Profile extends React.Component {
  state = {
    activeModules: '',
    deleteProfile: false,
  }
  componentDidMount = () => {
    this.props.dispatch(fetchModules())
  }

  sidebarClickHandler = (whichButton) => {
    this.setState({
      activeModules: whichButton
    })
    switch(whichButton){
      case("saved modules"):
      this.getSavedModules()
      case("your modules"):
      this.getYourModules()
    }
  }

  getYourModules = () => {
    const yourModules = this.props.modules.filter((item) => item.user_id == this.props.user.uid)
    this.setState({yourModules: yourModules})
  }

  getSavedModules = () => {
    let id = this.props.savedModules.map(module => module.module_id)
    let modules = this.props.modules.filter(module => id.includes(module.id))
    this.setState({
          savedModules: modules
        })
  }

  setDelete = (boolean) => {
    this.setState({
      deleteProfile:boolean
    })
  }
  render() {
    return (
      <>
        <div className="profile-page">
          <div className="left column" >
            <div className="profile-options-box">
              <div className="heading">
                <h1 className='Welcome'> Welcome {this.props.user.userName} </h1>
                {this.props.user.photoURL && <img className='pokemon' src={this.props.user.photoURL}/>}
              </div>
              <div className="options">
              {this.props.hasLoaded.authHasLoaded && <>{this.props.user && <>
                <div onClick={() => this.sidebarClickHandler('your modules') }className="single-option">
                  <img src="/images/folder-24px-blue.svg"/>
                  <span> Your Created Modules </span>
                </div>
                <div onClick={() => { this.sidebarClickHandler('saved modules') }} className="single-option">
                  <img src="/images/folder-24px-green.svg"/>
                  <span> Your Saved Modules </span>
                </div>
                <Link to="/create" >
                  <div className="single-option">
                    <img src="/images/add_box-24px.svg"/>
                    <span> Create A Module </span>
                  </div>
                </Link>
                <div onClick={() => this.sidebarClickHandler('edit') }className="single-option">
                  <img src="/images/edit-24px.svg"/>
                  <span> Edit Profile </span>
                </div>
                </>}</>}
              </div>
            </div>
          </div>
          <div className="middle column" >
            {this.props.hasLoaded.modulesHaveLoaded && <>
            {this.state.activeModules === "saved modules" && <SavedModules savedModules={this.state.savedModules}/>}
            {this.state.activeModules === "your modules" && <YourModules yourModules={this.state.yourModules}/>}
            {this.state.activeModules === "edit" && <EditProfile props={this.state.user} sidebarClickHandler={this.sidebarClickHandler} setDelete={this.setDelete}/>}
            {this.state.activeModules === "password" && <EditPassword props={this.state.user} sidebarClickHandler={this.sidebarClickHandler}/>}
            {this.state.activeModules === "avatar" && <EditAvatar props={this.state.user} sidebarClickHandler={this.sidebarClickHandler}/>}
            {this.state.deleteProfile === true && <Delete setDelete={this.setDelete} dispatch={this.props.dispatch} history={this.props.history}/>}
            </> }
          </div>
          <div className="right column" >
          </div>
        </div>
      </>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    dispatch: globalState.dispatch,
    user: globalState.user,
    modules: globalState.modules,
    savedModules: globalState.savedModules,
    hasLoaded: globalState.hasLoaded
  }
}

export default connect(mapStateToProps)(Profile)
