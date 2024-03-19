import {useLocation, Redirect} from 'react-router-dom'
import styled from 'styled-components'
import {BiListPlus} from 'react-icons/bi'
import Cookies from 'js-cookie'

import './index.css'

import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import SideOptions from '../SideOptions'
import TrendingVideoDetails from '../TrendingVideoDetails'

const SavedVideos = () => {
  const location = useLocation()
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme, savedVideosList} = value

        const SavedVideosSubCont = styled.div`
          display: flex;
          align-items: center;
          padding: 15px;
          padding-left: 30px;
          background-color: ${props => props.bgColor};
        `
        const SavedVideosIconCont = styled.div`
          background-color: ${props => props.bgColor};
          padding: 15px;
          border-radius: 60px;
          margin-right: 20px;
        `
        const SavedVideosHead = styled.h1`
          font-family: 'Roboto';
          color: ${props => props.color};
          font-size: 28px;
        `
        const NoSavedVideosText = styled.p`
          font-family: 'Roboto';
          color: ${props => props.color};
          font-size: 15px;
          padding-top: 0px;
          margin-top: 0px;
        `
        const SavedVideosDarkCont = styled.div`
          background-color: ${props => props.bgColor};
        `

        const savedVideosUi = () => (
          <>
            <SavedVideosSubCont bgColor={darkTheme ? '#181818' : '#ebebeb'}>
              <SavedVideosIconCont bgColor={darkTheme ? '#0f0f0f' : '#d7dfe9'}>
                <BiListPlus className="saved-videos-icon" />
              </SavedVideosIconCont>
              <SavedVideosHead color={darkTheme ? '#ffffff' : '#000000'}>
                Saved Videos
              </SavedVideosHead>
            </SavedVideosSubCont>
            <ul>
              {savedVideosList.map(eachItem => (
                <TrendingVideoDetails
                  key={eachItem.id}
                  videoDetails={eachItem}
                  darkTheme={darkTheme}
                />
              ))}
            </ul>
          </>
        )

        const noSavedVideosUi = () => (
          <div className="no-saved-videos-cont">
            <img
              className="no-saved-videos-img"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
            <SavedVideosHead color={darkTheme ? '#ffffff' : '#000000'}>
              No saved videos found
            </SavedVideosHead>
            <NoSavedVideosText color={darkTheme ? '#ebebeb' : '#212121'}>
              You can save your videos while watching them
            </NoSavedVideosText>
          </div>
        )

        const renderSavedVideos =
          savedVideosList.length === 0 ? noSavedVideosUi() : savedVideosUi()

        return (
          <div>
            <Header />
            <div className="saved-videos-cont">
              <SideOptions uiPath={location.pathname} />
              <SavedVideosDarkCont
                bgColor={darkTheme && '#0f0f0f'}
                className="saved-videos-main-cont"
                data-testid="savedVideos"
              >
                {renderSavedVideos}
              </SavedVideosDarkCont>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default SavedVideos
