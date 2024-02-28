import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

import ThemeContext from '../../context/ThemeContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showLoginError: false,
    loginErrorMsg: '',
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userLoginDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userLoginDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
      const {history} = this.props
      history.replace('/')
      this.setState({
        username: '',
        password: '',

        showLoginError: false,
        loginErrorMsg: '',
      })
    } else {
      this.setState({
        showLoginError: true,
        loginErrorMsg: data.error_msg,
      })
    }
  }

  onChangeShowPassword = event => {
    this.setState({showPassword: event.target.checked})
  }

  render() {
    const {
      username,
      password,
      showPassword,
      loginErrorMsg,
      showLoginError,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value
          return (
            <div
              className={darkTheme ? 'login-main-cont-dark' : 'login-main-cont'}
            >
              <div
                className={darkTheme ? 'login-sub-cont-dark' : 'login-sub-cont'}
              >
                <img
                  className="login-logo"
                  src={
                    darkTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                />
                <form className="login-form-elem" onSubmit={this.submitForm}>
                  <label
                    className={`login-label-text ${
                      darkTheme && 'login-label-text-dark'
                    }`}
                    htmlFor="usernameId"
                  >
                    USERNAME
                  </label>
                  <input
                    className={`login-input-elem ${
                      darkTheme && 'login-input-elem-dark'
                    }`}
                    type="text"
                    id="usernameId"
                    onChange={this.changeUsername}
                    placeholder="Username"
                    value={username}
                  />
                  <label
                    className={`login-label-text ${
                      darkTheme && 'login-label-text-dark'
                    }`}
                    htmlFor="passwordId"
                  >
                    PASSWORD
                  </label>
                  <input
                    className={`login-input-elem ${
                      darkTheme && 'login-input-elem-dark'
                    }`}
                    type={showPassword ? 'text' : 'password'}
                    id="passwordId"
                    onChange={this.changePassword}
                    placeholder="Password"
                    value={password}
                  />
                  <div className="login-checkbox-cont">
                    <input
                      type="checkbox"
                      id="checkboxId"
                      onClick={this.onChangeShowPassword}
                    />
                    <label
                      className={`login-checkbox-label ${
                        darkTheme && 'login-checkbox-label-dark'
                      }`}
                      htmlFor="checkboxId"
                    >
                      Show Password
                    </label>
                  </div>
                  <button className="login-button" type="submit">
                    Login
                  </button>
                  {showLoginError && (
                    <p className="login-error">*{loginErrorMsg}</p>
                  )}
                </form>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
