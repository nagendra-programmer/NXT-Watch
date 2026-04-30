import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'

const NotFound = () => {
  const imgUrl =
    'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
  return (
    <div>
      <Header />

      <div className="notfound-layout">
        <Sidebar />

        <div className="notfound-content">
          <img src={imgUrl} alt="not found" />

          <h1>Page Not Found</h1>

          <p>We are sorry, the page you requested could not be found.</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
