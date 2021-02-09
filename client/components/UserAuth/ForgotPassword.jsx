import React from 'react'
import { connect } from 'react-redux'
import { resetPassword } from '../../actions/authenticated'

class Login extends React.Component {
  state={
    email:'',
    error:'',
    message: '',
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
    event.preventDefault()
    try{
      const callback = () => { this.props.history.push("/") }
      resetPassword(this.state.email, callback, this.setError)
    }catch (e) {
      console.log(e)
      return "Failed to login"
    }
  
  }

  render () {
    return (
      <div className='Register-card'>

        <h1>Reset Password</h1>
        {this.state.message && <h3>Email has been sent</h3>}
        {this.state.error && <h1>{this.state.error}</h1>}
        <form onSubmit={this.handleSubmit}> 
          <input className='Input-R' type="text" name="email" onChange={this.handleChange} value={this.state.email} placeholder="email"/>
          <input className='button' type="submit" disabled={this.state.loading} value="Reset"/>
        </form>
      </div>
    )
  }
}

export default connect()(Login)
