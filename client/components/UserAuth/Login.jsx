import React from 'react'
import { connect } from 'react-redux'
import { Link} from 'react-router-dom'
import { google } from '../../firebase'
import { signIn, signInWithOutsideProvider } from '../../actions/authenticated'


class Login extends React.Component {
  state={
    email:'jistross@test.com',
    password:'gopher',
    error:'',
    loading: false,
  }

  setLoading = (boolean) => {
    this.setState({loading:boolean})
  }

  setError = (errorMess) => {
    this.setState({error:errorMess})
    this.setLoading(false)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  handleSubmit = (event) => {
    this.setLoading(true)
    event.preventDefault()
    try{
      const callback = () => { this.props.history.push("/") }
      this.props.dispatch(signIn(this.state.email, this.state.password, callback, this.setError))
    }catch (e) {
      console.log(e)
      // this.setError("Failed to login")
      return "Failed to login"
    }
  }

  handleGoogle = (google) => {
    try{
      const onSuccess = () => { 
        this.props.history.push("/")
      }
      this.props.dispatch(signInWithOutsideProvider(google, onSuccess))
    }catch {
      return "Failed to login"
    }
  }


  render () {
    return (
      <div className='Register-card'>
        <h1>Login</h1>
        {this.state.error && <h1 >{this.state.error}</h1>}
        <form onSubmit={this.handleSubmit}> 
          <input className='Input-R' type="text" name="email" onChange={this.handleChange} value={this.state.email} placeholder="email"/>
          <input className='Input-R' type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="password"/>
          <input className='button' type="submit" disabled={this.state.loading} value="Login"/>
        </form>
        <div> 
          {/* <svg height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M482.56 261.36c0-16.73-1.5-32.83-4.29-48.27H256v91.29h127.01c-5.47 29.5-22.1 54.49-47.09 71.23v59.21h76.27c44.63-41.09 70.37-101.59 70.37-173.46z" fill="#4285f4"></path><path d="M256 492c63.72 0 117.14-21.13 156.19-57.18l-76.27-59.21c-21.13 14.16-48.17 22.53-79.92 22.53-61.47 0-113.49-41.51-132.05-97.3H45.1v61.15c38.83 77.13 118.64 130.01 210.9 130.01z" fill="#34a853"></path><path d="M123.95 300.84c-4.72-14.16-7.4-29.29-7.4-44.84s2.68-30.68 7.4-44.84V150.01H45.1C29.12 181.87 20 217.92 20 256c0 38.08 9.12 74.13 25.1 105.99l78.85-61.15z" fill="#fbbc05"></path><path d="M256 113.86c34.65 0 65.76 11.91 90.22 35.29l67.69-67.69C373.03 43.39 319.61 20 256 20c-92.25 0-172.07 52.89-210.9 130.01l78.85 61.15c18.56-55.78 70.59-97.3 132.05-97.3z" fill="#ea4335"></path><path d="M20 20h472v472H20V20z"></path></g></svg> */}
          {/* <span><button className='google' onClick={() => this.handleGoogle(google)}>Continue with Google</button> </span> */}
          <span><img onClick={() => this.handleGoogle(google)} src='/images/Google/btn_google_signin_dark_normal_web.png' alt="Sign in with Google"/></span>
        </div> 
        <Link to='/forgotpassword'>
          Forgot password?
        </Link>
        {/* <div>
        <span><button onClick={() => this.handleGoogle(github)}>Continue with Github</button> </span>
        </div> */}
      </div>
    )
  }
}

export default connect()(Login)
