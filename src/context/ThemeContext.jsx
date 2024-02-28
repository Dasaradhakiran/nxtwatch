import React from 'react'

const ThemeContext = React.createContext({
  darkTheme: '',
  savedVideosList: [],
  likedList: [],
  dislikedList1: [],
  changeTheme: () => {},
})

export default ThemeContext
