import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import './index.css'

const LogoutPopup = props => {
  const {closePopup, history} = props

  const onConfirmLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <p className="popup-text">Are you sure you want to logout?</p>

        <div className="popup-buttons">
          <button type="button" className="cancel-btn" onClick={closePopup}>
            Cancel
          </button>

          <button
            type="button"
            className="confirm-btn"
            onClick={onConfirmLogout}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(LogoutPopup)
