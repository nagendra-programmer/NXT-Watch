import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'

import './index.css'

const Sidebar = () => (
  <div className="sidebar-container">
    <ul className="menu-list">
      <li>
        <Link to="/">
          {' '}
          <AiFillHome /> Home{' '}
        </Link>
      </li>

      <li>
        <Link to="/trending">
          {' '}
          <HiFire /> Trending{' '}
        </Link>
      </li>

      <li>
        <Link to="/gaming">
          {' '}
          <SiYoutubegaming /> Gaming{' '}
        </Link>
      </li>

      <li>
        <Link to="/saved-videos">
          {' '}
          <CgPlayListAdd /> Saved Videos{' '}
        </Link>
      </li>
    </ul>

    <div className="contact-section">
      <p>CONTACT US</p>

      <div className="social-icons">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
        />

        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
        />

        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
        />
      </div>

      <p>Enjoy! Now to see your channels and recommendations!</p>
    </div>
  </div>
)

export default Sidebar
