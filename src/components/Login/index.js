import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
    showError: false,
  }

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  togglePassword = () => {
    this.setState(prev => ({
      showPassword: !prev.showPassword,
    }))
  }

  submitForm = async e => {
    e.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(userDetails),
    })

    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({
        showError: true,
        errorMsg: data.error_msg,
      })
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showPassword, showError, errorMsg} = this.state

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="login-logo"
          />

          <div className="input-container">
            <label htmlFor="username">USERNAME</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>

          <div className="input-container">
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={this.onChangePassword}
            />
          </div>

          <div className="checkbox-container">
            <input
              id="showPassword"
              type="checkbox"
              onChange={this.togglePassword}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          {showError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
