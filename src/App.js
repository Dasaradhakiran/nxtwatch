import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import Login from './components/Login'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'

import ThemeContext from './context/ThemeContext'

// Replace your code here
class App extends Component {
  state = {
    darkTheme: false,
    savedVideosList: [],
    likedList: [],
    dislikedList: [],
  }

  changeTheme = () => {
    this.setState(prevState => ({darkTheme: !prevState.darkTheme}))
  }

  clickSaveVideo = video => {
    const {savedVideosList} = this.state
    const isPresent = savedVideosList.filter(
      eachItem => video.id === eachItem.id,
    )
    if (isPresent.length === 0) {
      this.setState({savedVideosList: [...savedVideosList, video]})
    } else {
      const filterList = savedVideosList.filter(
        eachVideo => video.id !== eachVideo.id,
      )
      this.setState({savedVideosList: filterList})
    }
  }

  clickLikeVideo = videoId => {
    const {likedList, dislikedList} = this.state
    if (!likedList.includes(videoId)) {
      this.setState({likedList: [...likedList, videoId]})
    } else {
      const filterLike = likedList.filter(eachData => eachData !== videoId)
      this.setState({likedList: filterLike})
    }
    if (dislikedList.includes(videoId)) {
      const filterDisLike = dislikedList.filter(
        eachData => eachData !== videoId,
      )
      this.setState({dislikedList: filterDisLike})
    }
  }

  clickDislikeVideo = videoId => {
    const {likedList, dislikedList} = this.state
    if (!dislikedList.includes(videoId)) {
      this.setState({dislikedList: [...dislikedList, videoId]})
    } else {
      const filterDisLike = dislikedList.filter(
        eachData => eachData !== videoId,
      )
      this.setState({dislikedList: filterDisLike})
    }
    if (likedList.includes(videoId)) {
      const filterLike = likedList.filter(eachData => eachData !== videoId)
      this.setState({likedList: filterLike})
    }
  }

  render() {
    const {darkTheme, savedVideosList, likedList, dislikedList} = this.state

    return (
      <ThemeContext.Provider
        value={{
          darkTheme,
          savedVideosList,
          likedList,
          dislikedList,
          changeTheme: this.changeTheme,
          clickSaveVideo: this.clickSaveVideo,
          clickLikeVideo: this.clickLikeVideo,
          clickDislikeVideo: this.clickDislikeVideo,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/gaming" component={Gaming} />
          <Route exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/videos/:id" component={VideoItemDetails} />
          <NotFound />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
