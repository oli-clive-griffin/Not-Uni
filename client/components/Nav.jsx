import React from 'react'
import { Route, Link } from 'react-router-dom'
import Search from './Search'
import {connect} from 'react-redux'
import { signOut } from '../actions/authenticated'

class Nav extends React.Component {
  handleClick= () =>{
    this.props.dispatch(signOut())
  }

  render () {
    return (
      <>
        <nav className="top-nav">
          <div className = 'logo' >
            <Link to="/"> 
              <img className="logo-pic" src="/images/not_uni.png" />
            </Link>
          </div>
          {this.props.location.pathname === '/'
            ? '' : 
            <div className="search-container">
              <Route path = '/' component={Search}/>
            </div>
          }
          {/* if user is NOT signed in */}
          {this.props.hasLoaded.authHasLoaded &&
            <>
              {this.props.isAuthenticated == null && 
              <> 
                <Link to="/register"> 
                  <div className ='text'> 
                    <span> Register </span> 
                  </div>
                </Link>
                <Link to="/login">
                  <div className ='text' > 
                    <span> Login </span> 
                  </div>
                </Link>
              </>
              }
              {/* if user is signed in */}
              { this.props.isAuthenticated === true && 
              <>
                <Link onClick={this.handleClick} to='/'>
                  <div className ='text'>
                    <span>Sign Out</span>
                  </div>
                </Link>

                <Link to="/profile"> 
                  <div className ='text' > 
                    <span> Account </span>
                    {this.props.user.photoURL ? <img className ='pokemon' src={this.props.user.photoURL}/> : <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>}
                  </div>
                </Link>
              </>
              }
            </>
          }
        </nav>
      </>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    user: globalState.user,
    isAuthenticated: globalState.isAuthenticated,
    hasLoaded: globalState.hasLoaded
  }
}

export default connect(mapStateToProps)(Nav)
