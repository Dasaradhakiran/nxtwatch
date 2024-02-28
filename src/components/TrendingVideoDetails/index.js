import {Link} from 'react-router-dom'
import Styled from 'styled-components'

import './index.css'

const TrendingVideoDetails = props => {
  const {videoDetails, darkTheme} = props
  const {
    id,
    title,
    channelName,
    thumbnailUrl,
    viewCount,
    publishedAt,
  } = videoDetails

  const pastDate = new Date(publishedAt)
  const newDate = new Date()
  const diffDate = newDate.getTime() - pastDate.getTime()
  const diffDays = Math.round(diffDate / (1000 * 3600 * 24))
  const diffYears = Math.round(diffDays / 365)

  const TrendingTitleText = Styled.p`
    font-family: 'Roboto';
    color: ${darkTheme ? '#ffffff' : '#212121'};
    font-size: 18px;
    font-weight: 600;
    padding-top: 0px;
    margin-top: 0px;
    line-height: 20px;
    margin-bottom: 8px;
  `

  return (
    <li className="trending-video-cont">
      <Link to={`/videos/:${id}`} className="trending-video-link">
        <img
          className="trending-video-image"
          src={thumbnailUrl}
          alt="video thumbnail"
        />
        <div className="trending-video-sub-cont">
          <TrendingTitleText>{title}</TrendingTitleText>
          <p className="trending-video-name-text">{channelName}</p>
          <div className="trending-video-bottom-cont">
            <p className="trending-video-bottom-text">{viewCount} views</p>
            <p className="trending-video-dot-text">.</p>
            <p className="trending-video-bottom-text">{diffYears} years ago</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default TrendingVideoDetails
