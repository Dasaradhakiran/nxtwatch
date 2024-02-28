import {Component} from 'react'
import styled from 'styled-components'
import {BsX} from 'react-icons/bs'
import {IoMdSearch} from 'react-icons/io'
import Cookies from 'js-cookie'

import './index.css'

import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import SideOptions from '../SideOptions'
import HomeVideoDetails from '../HomeVideoDetails'
import LoaderPage from '../LoaderPage'
import FailureView from '../FailureView'

class Home extends Component {
  state = {
    showBanner: true,
    searchInput: '',
    homeList: [],
    homeLoading: false,
    homeError: false,
  }

  componentDidMount() {
    this.getHomeDetails()
  }

  closeBanner = () => {
    this.setState({showBanner: false})
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getHomeDetails = async () => {
    this.setState({homeLoading: true})
    const {searchInput} = this.state
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
      `https://apis.ccbp.in/videos/all?search=${searchInput}`,
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      const modifyHomeList = data.videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        channelName: eachItem.channel.name,
        profileImageUrl: eachItem.channel.profile_image_url,
        viewCount: eachItem.view_count,
        publishedAt: eachItem.published_at,
      }))

      this.setState({
        homeList: modifyHomeList,
        homeLoading: false,
        homeError: false,
      })
    } else {
      this.setState({homeError: true, homeLoading: false})
    }
  }

  render() {
    const {
      showBanner,
      searchInput,
      homeList,
      homeLoading,
      homeError,
    } = this.state

    const {match} = this.props
    const {path} = match

    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value

          const SearchButton = styled.button`
            background-color: #cccccc;
            cursor: pointer;
            outline: none;
            border: 0px;
            height: 25px;
            width: 68px;
          `
          const HomeBannerCont = styled.div`
            background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
            background-size: cover;
            padding: 15px;
            padding-left: 28px;
          `
          const BannerCloseButton = styled.button`
            background-color: transparent;
            border: 0px;
            cursor: pointer;
            outline: none;
          `
          const NoResultHead = styled.h1`
            font-family: 'Roboto';
            color: ${darkTheme ? '#ffffff' : '#383838'};
            font-size: 20px;
          `
          const NoResultText = styled.p`
            font-family: 'Roboto';
            color: #606060;
            font-size: 15px;
            margin-top: 0px;
            margin-bottom: 5px;
          `

          const renderHomePage = () => (
            <>
              <ul className="home-ul-cont">
                {homeList.map(eachItem => (
                  <HomeVideoDetails
                    key={eachItem.id}
                    homeVideoDetails={eachItem}
                    darkTheme={darkTheme}
                  />
                ))}
              </ul>
            </>
          )

          const homeNoResultPage = () => (
            <div className="home-error-cont">
              <img
                className="home-error-image"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                alt="no videos"
              />
              <NoResultHead>No Search results found</NoResultHead>
              <NoResultText>
                Try different key words or remove search filter
              </NoResultText>
              <button
                className="home-error-button"
                type="button"
                onClick={this.getHomeDetails}
              >
                Retry
              </button>
            </div>
          )

          let homeRenderUi =
            homeList.length === 0 ? homeNoResultPage() : renderHomePage()

          homeRenderUi = homeError ? (
            <FailureView
              darkTheme={darkTheme}
              clickRetry={this.getHomeDetails}
            />
          ) : (
            homeRenderUi
          )

          return (
            <div>
              <Header />
              <div className="home-cont">
                <SideOptions uiPath={path} />
                <div
                  className={`home-main-cont ${
                    darkTheme && 'home-main-cont-dark'
                  }`}
                  data-testid="home"
                >
                  {showBanner && (
                    <HomeBannerCont data-testid="banner">
                      <div className="home-banner-logo-cont">
                        <img
                          className="home-banner-logo"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />
                        <BannerCloseButton
                          type="button"
                          onClick={this.closeBanner}
                          data-testid="close"
                        >
                          <BsX />
                        </BannerCloseButton>
                      </div>
                      <p className="home-banner-text">
                        Buy Nxt Watch Premium prepaid plans with <br /> UPI
                      </p>
                      <button type="button" className="home-banner-button">
                        GET IT NOW
                      </button>
                    </HomeBannerCont>
                  )}
                  <div className="home-search-cont">
                    <input
                      className="home-search-input"
                      type="search"
                      placeholder="Search"
                      value={searchInput}
                      onChange={this.changeSearchInput}
                    />
                    <SearchButton
                      type="button"
                      onClick={this.getHomeDetails}
                      data-testid="searchButton"
                    >
                      <IoMdSearch className="home-search-icon" />
                    </SearchButton>
                  </div>
                  {homeLoading ? <LoaderPage /> : homeRenderUi}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
