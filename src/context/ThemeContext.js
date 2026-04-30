import React from 'react'

const ThemeContext = React.createContext({
  savedVideos: [],
  addSavedVideo: () => {},
  removeSavedVideo: () => {},
})

export default ThemeContext
