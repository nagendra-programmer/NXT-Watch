import {Link} from 'react-router-dom'
import './index.css'

const VideoCard = props => {
  const {videoDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    channel,
    viewCount,
    publishedAt,
  } = videoDetails

  return (
    <li className="video-card">
      <Link to={`/videos/${id}`} className="link">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail" />

        <div className="video-info">
          <img
            src={channel.profile_image_url}
            alt="channel logo"
            className="channel-logo"
          />

          <div>
            <p className="title">{title}</p>
            <p className="channel-name">{channel.name}</p>
            <p className="views">
              {viewCount} views • {publishedAt}
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default VideoCard
