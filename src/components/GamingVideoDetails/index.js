import {Link} from 'react-router-dom'
import {GamingTitleText} from '../StyledComponents'

import './index.css'

const GamingVideoDetails = props => {
  const {videoDetails, darkTheme} = props
  const {id, title, thumbnailUrl, viewCount} = videoDetails

  return (
    <li className="game-video-li-elem">
      <Link to={`/videos/:${id}`} className="gaming-video-link">
        <img
          className="game-video-image"
          src={thumbnailUrl}
          alt="video thumbnail"
        />
        <GamingTitleText color={darkTheme ? '#ffffff' : '#212121'}>
          {title}
        </GamingTitleText>
        <p className="gaming-video-name-text">{viewCount} Watching Worldwide</p>
      </Link>
    </li>
  )
}

export default GamingVideoDetails
