import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import LogoutPopup from '../LogoutPopup'

import './index.css'

const Header = () => (
  <div className="header-container">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="website logo"
        className="logo"
      />
    </Link>

    <div className="header-right">
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
      >
        {close => <LogoutPopup closePopup={close} />}
      </Popup>
    </div>
  </div>
)

export default withRouter(Header)
