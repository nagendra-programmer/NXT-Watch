import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Sidebar = props => {
  const {location} = props
  const {pathname} = location

  const getClass = path => (pathname === path ? 'nav-link active' : 'nav-link')

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/" className={getClass('/')}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/trending" className={getClass('/trending')}>
            Trending
          </Link>
        </li>
        <li>
          <Link to="/gaming" className={getClass('/gaming')}>
            Gaming
          </Link>
        </li>
        <li>
          <Link to="/saved-videos" className={getClass('/saved-videos')}>
            Saved Videos
          </Link>
        </li>
      </ul>
      <div className="contact-section">
        <p className="contact-title">CONTACT US</p>

        <div className="social-icons">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linkedin"
          />
        </div>

        <p className="contact-desc">
          Enjoy! Now to see your channels and recommendations!
        </p>
      </div>
    </div>
  )
}

export default withRouter(Sidebar)
