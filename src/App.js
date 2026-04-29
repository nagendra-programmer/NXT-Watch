import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ThemeContext from './context/ThemeContext'

import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideos: [],
  }

  toggleTheme = () => {
    this.setState(prev => ({
      isDarkTheme: !prev.isDarkTheme,
    }))
  }

  addSavedVideo = video => {
    this.setState(prev => ({
      savedVideos: [...prev.savedVideos, video],
    }))
  }

  removeSavedVideo = id => {
    this.setState(prev => ({
      savedVideos: prev.savedVideos.filter(each => each.id !== id),
    }))
  }

  render() {
    const {isDarkTheme, savedVideos} = this.state

    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          toggleTheme: this.toggleTheme,
          savedVideos,
          addSavedVideo: this.addSavedVideo,
          removeSavedVideo: this.removeSavedVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />

          <ProtectedRoute exact path="/" component={Home} />

          <ProtectedRoute exact path="/trending" component={Trending} />

          <ProtectedRoute exact path="/gaming" component={Gaming} />

          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />

          <ProtectedRoute path="/videos/:id" component={VideoItemDetails} />

          <Route path="/not-found" component={NotFound} />

          <Redirect to="/not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
