import {Link} from 'react-router-dom'
import './index.css'

const GamingVideoCard = props => {
  const {video} = props
  const {id, thumbnailUrl, title, viewCount} = video

  return (
    <li className="gaming-card">
      <Link to={`/videos/${id}`} className="link">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail" />

        <p className="title">{title}</p>

        <p>{viewCount} Watching Worldwide</p>
      </Link>
    </li>
  )
}

export default GamingVideoCard
