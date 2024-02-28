import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

import './index.css'

import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import SideOptions from '../SideOptions'
import FailureView from '../FailureView'
import LoaderPage from '../LoaderPage'

class VideoItemDetails extends Component {
  state = {videoItemDetails: {}, videoItemLoading: false, videoItemError: false}

  componentDidMount() {
    this.getVideoItemDetails()
  }

  getVideoItemDetails = async () => {
    this.setState({videoItemLoading: true})
    const {match} = this.props
    const {params} = match
    let {id} = params
    id = id.slice(1)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateVideoItemDetails = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        channelName: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }

      this.setState({
        videoItemDetails: updateVideoItemDetails,
        videoItemLoading: false,
        videoItemError: false,
      })
    } else {
      this.setState({videoItemLoading: false, videoItemError: true})
    }
  }

  render() {
    const {videoItemDetails, videoItemLoading, videoItemError} = this.state
    const {
      id,
      videoUrl,
      title,
      profileImageUrl,
      channelName,
      viewCount,
      publishedAt,
      description,
      subscriberCount,
    } = videoItemDetails

    const pastDate = new Date(publishedAt)
    const newDate = new Date()
    const diffDate = newDate.getTime() - pastDate.getTime()
    const diffDays = Math.round(diffDate / (1000 * 3600 * 24))
    const diffYears = Math.round(diffDays / 365)

    return (
      <ThemeContext.Consumer>
        {value => {
          const {
            darkTheme,
            clickSaveVideo,
            clickLikeVideo,
            clickDislikeVideo,
            savedVideosList,
            likedList,
            dislikedList,
          } = value

          const videoPresentList = savedVideosList.filter(
            eachVideo => id === eachVideo.id,
          )
          const isPresentVideo = videoPresentList.length !== 0
          const isLikeVideo = likedList.includes(id)
          const isDislikeVideo = dislikedList.includes(id)

          const saveClick = () => {
            clickSaveVideo(videoItemDetails)
          }
          const likeClick = () => {
            clickLikeVideo(id)
          }
          const dislikeClick = () => {
            clickDislikeVideo(id)
          }

          const videoItemUI = () => (
            <>
              <div
                data-testid="videoItemDetails"
                className={`video-item-details-sub-cont ${
                  darkTheme && 'video-item-details-sub-cont-dark'
                }`}
              >
                <ReactPlayer
                  url={videoUrl}
                  controls
                  width="800px"
                  height="400px"
                />
                <h1
                  className={`video-item-title ${
                    darkTheme && 'video-item-dark-text'
                  }`}
                >
                  {title}
                </h1>
                <div className="video-item-middle-cont">
                  <div className="video-item-date-cont">
                    <p className="video-item-date-text">{viewCount} views</p>
                    <p className="video-item-dot-text">.</p>
                    <p className="video-item-date-text">
                      {diffYears} years ago
                    </p>
                  </div>
                  <div className="video-item-icon-main-cont">
                    <button
                      onClick={likeClick}
                      type="button"
                      className="video-item-icon-cont"
                    >
                      <BiLike
                        className={`video-item-icon ${
                          isLikeVideo && 'video-item-active-state'
                        }`}
                      />
                      <p
                        className={`video-item-icon-text ${
                          isLikeVideo && 'video-item-active-state'
                        }`}
                      >
                        Like
                      </p>
                    </button>
                    <button
                      onClick={dislikeClick}
                      type="button"
                      className="video-item-icon-cont"
                    >
                      <BiDislike
                        className={`video-item-icon ${
                          isDislikeVideo && 'video-item-active-state'
                        }`}
                      />
                      <p
                        className={`video-item-icon-text ${
                          isDislikeVideo && 'video-item-active-state'
                        }`}
                      >
                        Dislike
                      </p>
                    </button>
                    <button
                      onClick={saveClick}
                      type="button"
                      className="video-item-icon-cont"
                    >
                      <BiListPlus
                        className={`video-item-icon ${
                          isPresentVideo && 'video-item-active-state'
                        }`}
                      />
                      <p
                        className={`video-item-icon-text ${
                          isPresentVideo && 'video-item-active-state'
                        }`}
                      >
                        {isPresentVideo ? 'Saved' : 'Save'}
                      </p>
                    </button>
                  </div>
                </div>
                <div className="video-item-bottom-cont">
                  <img
                    className="video-item-profile"
                    src={profileImageUrl}
                    alt="profile"
                  />
                  <div>
                    <p
                      className={`video-item-name ${
                        darkTheme && 'video-item-dark-text'
                      }`}
                    >
                      {channelName}
                    </p>
                    <p className="video-item-subscriber">
                      {subscriberCount} subscribers
                    </p>
                    <p
                      className={`video-item-description ${
                        darkTheme && 'video-item-dark-text'
                      }`}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )

          const renderVideoItem = videoItemError ? (
            <FailureView
              darkTheme={darkTheme}
              clickRetry={this.getVideoItemDetails}
            />
          ) : (
            videoItemUI()
          )

          return (
            <div>
              <Header />
              <div className="video-item-details-cont">
                <SideOptions />
                {videoItemLoading ? <LoaderPage /> : renderVideoItem}
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
