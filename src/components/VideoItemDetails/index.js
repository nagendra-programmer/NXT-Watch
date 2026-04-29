import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Sidebar from '../Sidebar'
import FailureView from '../FailureView'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    apiStatus: apiStatusConstants.initial,
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const {match} = this.props
    const {id} = match.params

    const jwtToken = Cookies.get('jwt_token')

    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      const video = data.video_details

      const formattedData = {
        id: video.id,
        title: video.title,
        videoUrl: video.video_url,
        thumbnailUrl: video.thumbnail_url,
        viewCount: video.view_count,
        publishedAt: video.published_at,
        description: video.description,
        channel: video.channel,
      }

      this.setState({
        videoDetails: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  clickLike = () => {
    this.setState(prev => ({
      isLiked: !prev.isLiked,
      isDisliked: false,
    }))
  }

  clickDislike = () => {
    this.setState(prev => ({
      isDisliked: !prev.isDisliked,
      isLiked: false,
    }))
  }

  renderSuccessView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {
          addSavedVideo,
          removeSavedVideo,
          savedVideos,
          isDarkTheme,
        } = value

        const {videoDetails, isLiked, isDisliked} = this.state

        const isSaved = savedVideos.some(each => each.id === videoDetails.id)

        const toggleSave = () => {
          if (isSaved) {
            removeSavedVideo(videoDetails.id)
          } else {
            addSavedVideo(videoDetails)
          }
        }

        const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'

        return (
          <div className="video-details" style={{backgroundColor: bgColor}}>
            <ReactPlayer url={videoDetails.videoUrl} width="100%" />

            <p>{videoDetails.title}</p>

            <p>
              {videoDetails.viewCount} views • {videoDetails.publishedAt}
            </p>

            <div className="buttons-container">
              <button
                type="button"
                onClick={this.clickLike}
                style={{color: isLiked ? '#2563eb' : '#64748b'}}
              >
                Like
              </button>

              <button
                type="button"
                onClick={this.clickDislike}
                style={{color: isDisliked ? '#2563eb' : '#64748b'}}
              >
                Dislike
              </button>
              <button
                type="button"
                onClick={toggleSave}
                style={{color: isSaved ? '#2563eb' : '#64748b'}}
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>

            <hr />

            <div className="channel-info">
              <img
                src={videoDetails.channel.profile_image_url}
                alt="channel logo"
                className="channel-logo"
              />

              <div>
                <p>{videoDetails.channel.name}</p>
                <p>{videoDetails.channel.subscriber_count} subscribers</p>
                <p>{videoDetails.description}</p>
              </div>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.loading:
        return this.renderLoader()

      case apiStatusConstants.failure:
        return <FailureView retry={this.getVideoDetails} />

      default:
        return null
    }
  }

  render() {
    return (
      <div data-testid="videoItemDetails">
        <Header />

        <div className="video-layout">
          <Sidebar />

          <div className="video-content">{this.renderContent()}</div>
        </div>
      </div>
    )
  }
}

export default VideoItemDetails
