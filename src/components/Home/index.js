import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoCard from '../VideoCard'
import FailureView from '../FailureView'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    videosList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    showBanner: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const updatedData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        channel: each.channel,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))

      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  renderNoVideosView = () => (
    <div className="no-videos-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button type="button" onClick={this.getVideos}>
        Retry
      </button>
    </div>
  )

  renderVideos = () => {
    const {videosList} = this.state

    if (videosList.length === 0) {
      return this.renderNoVideosView()
    }

    return (
      <ul className="videos-list">
        {videosList.map(video => (
          <VideoCard key={video.id} videoDetails={video} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" height="50" width="50" />
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideos()

      case apiStatusConstants.loading:
        return this.renderLoader()

      case apiStatusConstants.failure:
        return <FailureView retry={this.getVideos} />

      default:
        return null
    }
  }

  render() {
    const {searchInput, showBanner} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'

          return (
            <div
              data-testid="home"
              className="home-container"
              style={{backgroundColor: bgColor}}
            >
              <Header />

              <div className="home-content">
                <Sidebar />

                <div className="videos-section">
                  {showBanner && (
                    <div
                      data-testid="banner"
                      className="banner"
                      style={{
                        backgroundImage:
                          'url("https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png")',
                      }}
                    >
                      <div className="banner-content">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />

                        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>

                        <button type="button">GET IT NOW</button>
                      </div>

                      <button
                        data-testid="close"
                        type="button"
                        onClick={() => this.setState({showBanner: false})}
                      >
                        X
                      </button>
                    </div>
                  )}

                  <div className="search-container">
                    <input
                      type="search"
                      value={searchInput}
                      onChange={this.onChangeSearch}
                    />

                    <button
                      data-testid="searchButton"
                      type="button"
                      onClick={this.getVideos}
                    >
                      Search
                    </button>
                  </div>

                  {this.renderContent()}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
