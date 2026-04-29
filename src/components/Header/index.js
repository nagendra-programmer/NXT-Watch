import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiSun} from 'react-icons/fi'
import {FaMoon} from 'react-icons/fa'

import Popup from 'reactjs-popup'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value

      const logoUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      return (
        <div className="header-container">
          <Link to="/">
            <img src={logoUrl} alt="website logo" className="logo" />
          </Link>

          <div className="header-icons">
            <button
              type="button"
              onClick={toggleTheme}
              data-testid="theme"
              className="theme-btn"
            >
              {isDarkTheme ? <FiSun size={25} /> : <FaMoon size={25} />}
            </button>

            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="profile-img"
            />

            <Popup
              modal
              trigger={
                <button type="button" className="logout-btn">
                  Logout
                </button>
              }
              className="popup-content"
            >
              {close => (
                <div className="popup-container">
                  <p>Are you sure, you want to logout?</p>

                  <div>
                    <button type="button" onClick={close}>
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        Cookies.remove('jwt_token')
                        const {history} = props
                        history.replace('/login')
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
