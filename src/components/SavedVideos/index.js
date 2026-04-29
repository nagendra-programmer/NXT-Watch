import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoCard from '../VideoCard'

import './index.css'

const SavedVideos = () => (
  <ThemeContext.Consumer>
    {value => {
      const {savedVideos} = value

      const renderNoVideos = () => (
        <div className="no-videos">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />

          <h1>No Saved Videos Found</h1>
          <p>You can save your videos while watching them</p>
        </div>
      )

      const renderVideos = () => (
        <ul className="saved-list">
          {savedVideos.map(video => (
            <VideoCard key={video.id} videoDetails={video} />
          ))}
        </ul>
      )

      return (
        <div data-testid="savedVideos">
          <Header />
          <div className="saved-banner">
            <h1>Saved Videos</h1>
          </div>
          <div className="saved-layout">
            <Sidebar />

            <div className="saved-content">
              {savedVideos.length === 0 ? renderNoVideos() : renderVideos()}
            </div>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideos
