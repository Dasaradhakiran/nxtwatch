import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import {IoSunnyOutline} from 'react-icons/io5'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import ThemeContext from '../../context/ThemeContext'
import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme, changeTheme} = value
      const backGround = darkTheme ? '#424242' : '#ffffff'
      const contentStyle = {
        background: backGround,
        borderRadius: 15,
        border: 0,
        width: 350,
        height: 150,
      }
      const onClickLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }
      return (
        <nav
          className={`header-nav-elem ${darkTheme && 'header-nav-elem-dark'}`}
        >
          <Link to="/">
            <img
              className="header-img-logo"
              src={
                darkTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              }
              alt="website logo"
            />
          </Link>
          <div className="header-sub-cont">
            <button
              data-testid="theme"
              type="button"
              onClick={changeTheme}
              className="header-theme-button"
            >
              {darkTheme ? (
                <IoSunnyOutline className="header-dark-theme-icon" />
              ) : (
                <FaMoon className="header-theme-icon" />
              )}
            </button>
            <img
              className="header-profile"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <Popup
              modal
              trigger={
                <button
                  className={`header-button ${
                    darkTheme && 'header-button-dark'
                  }`}
                  type="button"
                >
                  Logout
                </button>
              }
              {...{contentStyle}}
            >
              {close => (
                <div className="header-popup-cont">
                  <p
                    className={`header-popup-text ${
                      darkTheme && 'header-popup-text-dark'
                    }`}
                  >
                    Are you sure, you want to logout
                  </p>
                  <div>
                    <button
                      className={`header-popup-cancel-btn ${
                        darkTheme && 'header-popup-cancel-btn-dark'
                      }`}
                      type="button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onClickLogout}
                      className="header-popup-confirm-btn"
                      type="button"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </nav>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
