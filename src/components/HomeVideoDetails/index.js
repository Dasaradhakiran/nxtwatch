import {Link} from 'react-router-dom'

import {TitleText, NameText, BottomText, DotText} from '../StyledComponents'
import './index.css'

const HomeVideoDetails = props => {
  const {homeVideoDetails, darkTheme} = props
  const {
    id,
    title,
    thumbnailUrl,
    channelName,
    profileImageUrl,
    viewCount,
    publishedAt,
  } = homeVideoDetails

  const pastDate = new Date(publishedAt)
  const newDate = new Date()
  const diffDate = newDate.getTime() - pastDate.getTime()
  const diffDays = Math.round(diffDate / (1000 * 3600 * 24))
  const diffYears = Math.round(diffDays / 365)

  return (
    <li className="home-Videos-li-elem">
      <Link to={`/videos/:${id}`} className="home-Videos-link">
        <img
          className="home-Videos-image"
          src={thumbnailUrl}
          alt="video thumbnail"
        />
        <div className="home-Videos-sub-cont">
          <img
            className="home-Videos-logo"
            src={profileImageUrl}
            alt="channel logo"
          />
          <div>
            <TitleText color={darkTheme ? '#ffffff' : '#212121'}>
              {title}
            </TitleText>
            <NameText>{channelName}</NameText>
            <div className="home-Videos-date-cont">
              <BottomText>{viewCount} views</BottomText>
              <DotText>.</DotText>
              <BottomText>{diffYears} years ago</BottomText>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default HomeVideoDetails
