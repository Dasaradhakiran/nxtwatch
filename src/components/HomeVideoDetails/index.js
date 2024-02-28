import {Link} from 'react-router-dom'
import Styled from 'styled-components'

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

  const TitleText = Styled.p`
    font-family: 'Roboto';
    color: ${darkTheme ? '#ffffff' : '#212121'};
    font-size: 14px;
    padding-top: 0px;
    margin-top: 0px;
    line-height: 20px;
    margin-bottom: 8px;
  `
  const NameText = Styled.p`
        font-family: "Roboto";
        color: #616e7c;
        font-size: 14px;
        margin-top: 0px;
        padding-top: 0px;
        padding-bottom: 0px;
        margin-bottom: 0px;
   `
  const BottomText = Styled.p`
        font-family: "Roboto";
        color: #616e7c;
        font-size: 14px;
        margin-top: 0px;
        padding-top: 0px;
        padding-right: 10px;
   `
  const DotText = Styled.p`
        font-family: "Roboto";
        color: #616e7c;
        font-size: 25px;
        margin-top: 0px;
        padding-top: 0px;
        padding-right: 10px;
   `

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
            <TitleText>{title}</TitleText>
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
