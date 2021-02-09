import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { fetchModules } from '../actions'
import Search from './Search'
import { Route } from 'react-router-dom'

const HomePage = (props) => {
  useEffect(() => {
    props.dispatch(fetchModules())
  }, [])
    return (
      <div className='homepage'>
        <div className='homepage-logo'>
          <img src='/images/not_uni.png' alt='not-uni logo'></img>
        </div>
        <div className='seachBar'>
          <h1>What Would You Like To Learn Today?</h1>
          <Route path = '/' component={Search}/>
        </div>
      </div>
    )
}

function mapStateToProps (globalState) {
  return {
    searchModules: globalState.searchModules
  }
}
export default connect(mapStateToProps)(HomePage)
