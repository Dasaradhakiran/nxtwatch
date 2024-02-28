import {Link} from 'react-router-dom'
import Styled from 'styled-components'

import './index.css'

const GamingVideoDetails = props => {
  const {videoDetails, darkTheme} = props
  const {id, title, thumbnailUrl, viewCount} = videoDetails

  const GamingTitleText = Styled.p`
    font-family: 'Roboto';
    color: ${darkTheme ? '#ffffff' : '#212121'};
    font-size: 16px;
    font-weight: 600;
    padding-top: 0px;
    margin-top: 0px;
    line-height: 20px;
    margin-bottom: 8px;
  `

  return (
    <li className="game-video-li-elem">
      <Link to={`/videos/:${id}`} className="gaming-video-link">
        <img
          className="game-video-image"
          src={thumbnailUrl}
          alt="video thumbnail"
        />
        <GamingTitleText>{title}</GamingTitleText>
        <p className="gaming-video-name-text">{viewCount} Watching Worldwide</p>
      </Link>
    </li>
  )
}

export default GamingVideoDetails
