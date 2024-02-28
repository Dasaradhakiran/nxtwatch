import {Component} from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'

import './index.css'

import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import SideOptions from '../SideOptions'
import GamingVideoDetails from '../GamingVideoDetails'
import FailureView from '../FailureView'
import LoaderPage from '../LoaderPage'

class Gaming extends Component {
  state = {gamingList: [], gamingLoading: false, gamingError: false}

  componentDidMount() {
    this.getGamingList()
  }

  getGamingList = async () => {
    this.setState({gamingLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      const {history} = this.props
      history.replace('/login')
    }
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch('https://apis.ccbp.in/videos/gaming', options)
    if (response.ok === true) {
      const data = await response.json()
      const updateGamingList = data.videos.map(eachData => ({
        id: eachData.id,
        title: eachData.title,
        thumbnailUrl: eachData.thumbnail_url,
        viewCount: eachData.view_count,
      }))
      this.setState({
        gamingList: updateGamingList,
        gamingError: false,
        gamingLoading: false,
      })
    } else {
      this.setState({gamingError: true, gamingLoading: false})
    }
  }

  render() {
    const {gamingList, gamingError, gamingLoading} = this.state

    const {match} = this.props
    const {path} = match
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value

          const GamingSubCont = styled.div`
            display: flex;
            align-items: center;
            padding: 15px;
            padding-left: 30px;
            background-color: ${darkTheme ? '#181818' : '#ebebeb'};
          `
          const GamingIconCont = styled.div`
            background-color: ${darkTheme ? '#0f0f0f' : '#d7dfe9'};
            padding: 15px;
            border-radius: 60px;
            margin-right: 20px;
          `
          const GamingHead = styled.h1`
            font-family: 'Roboto';
            color: ${darkTheme ? '#ffffff' : '#000000'};
            font-size: 28px;
          `
          const gamingUi = () => (
            <>
              <ul className="gaming-ul-elem">
                {gamingList.map(eachItem => (
                  <GamingVideoDetails
                    key={eachItem.id}
                    videoDetails={eachItem}
                    darkTheme={darkTheme}
                  />
                ))}
              </ul>
            </>
          )
          const renderGaming = gamingError ? (
            <FailureView
              clickRetry={this.getGamingList}
              darkTheme={darkTheme}
            />
          ) : (
            gamingUi()
          )
          return (
            <div>
              <Header />
              <div className="gaming-cont">
                <SideOptions uiPath={path} />
                <div
                  className={`gaming-main-cont ${
                    darkTheme && 'gaming-main-cont-dark'
                  }`}
                  data-testid="gaming"
                >
                  <GamingSubCont>
                    <GamingIconCont>
                      <SiYoutubegaming className="gaming-icon" />
                    </GamingIconCont>
                    <GamingHead>Gaming</GamingHead>
                  </GamingSubCont>
                  {gamingLoading ? <LoaderPage /> : renderGaming}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
