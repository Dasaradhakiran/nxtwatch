import styled from 'styled-components'

import './index.css'

import Header from '../Header'
import SideOptions from '../SideOptions'
import ThemeContext from '../../context/ThemeContext'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme} = value

      const NotFoundHeading = styled.h1`
        font-family: 'Roboto';
        color: ${darkTheme ? '#ffffff' : '#1e293b'};
        font-size: 28px;
        margin-bottom: 0px;
      `
      const NotFoundText = styled.p`
        font-family: 'Roboto';
        color: ${darkTheme ? '#64748b' : '#475569'};
        font-size: 16px;
      `

      return (
        <div>
          <Header />
          <div className="not-found-cont">
            <SideOptions />
            <div
              className={`not-found-sub-cont ${
                darkTheme && 'not-found-sub-cont-dark'
              }`}
            >
              <img
                src={
                  darkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                }
                alt="not found"
                className="not-found-image"
              />
              <NotFoundHeading>Page Not Found</NotFoundHeading>
              <NotFoundText>
                We are sorry, the page you requested could not be found.
              </NotFoundText>
            </div>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
