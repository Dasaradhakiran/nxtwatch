import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
import Cookies from 'js-cookie'

import {
  TrendingSubCont,
  TrendingIconCont,
  TrendingHead,
} from '../StyledComponents'
import './index.css'

import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import SideOptions from '../SideOptions'
import TrendingVideoDetails from '../TrendingVideoDetails'
import FailureView from '../FailureView'
import LoaderPage from '../LoaderPage'

class Trending extends Component {
  state = {trendingList: [], trendingError: false, trendingLoading: false}

  componentDidMount() {
    this.getTrendingList()
  }

  getTrendingList = async () => {
    this.setState({trendingLoading: true})
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
    const response = await fetch(
      'https://apis.ccbp.in/videos/trending',
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      const updateTrendingList = data.videos.map(eachData => ({
        id: eachData.id,
        title: eachData.title,
        thumbnailUrl: eachData.thumbnail_url,
        channelName: eachData.channel.name,
        viewCount: eachData.view_count,
        publishedAt: eachData.published_at,
      }))
      this.setState({
        trendingList: updateTrendingList,
        trendingLoading: false,
        trendingError: false,
      })
    } else {
      this.setState({trendingLoading: false, trendingError: true})
    }
  }

  render() {
    const {trendingList, trendingLoading, trendingError} = this.state

    const {match} = this.props
    const {path} = match
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value

          const trendingUi = () => (
            <>
              <ul>
                {trendingList.map(eachItem => (
                  <TrendingVideoDetails
                    key={eachItem.id}
                    videoDetails={eachItem}
                    darkTheme={darkTheme}
                  />
                ))}
              </ul>
            </>
          )
          const trendingRender = trendingError ? (
            <FailureView
              darkTheme={darkTheme}
              clickRetry={this.getTrendingList}
            />
          ) : (
            trendingUi()
          )

          return (
            <div>
              <Header />
              <div className="trending-cont">
                <SideOptions uiPath={path} />
                <div
                  className={`trending-main-cont ${
                    darkTheme && 'trending-main-cont-dark'
                  }`}
                  data-testid="trending"
                >
                  <TrendingSubCont bgColor={darkTheme ? '#181818' : '#ebebeb'}>
                    <TrendingIconCont
                      bgColor={darkTheme ? '#0f0f0f' : '#d7dfe9'}
                    >
                      <HiFire className="trending-icon" />
                    </TrendingIconCont>
                    <TrendingHead color={darkTheme ? '#ffffff' : '#000000'}>
                      Trending
                    </TrendingHead>
                  </TrendingSubCont>
                  {trendingLoading ? <LoaderPage /> : trendingRender}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Trending
