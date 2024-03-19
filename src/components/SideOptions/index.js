import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

import './index.css'

import ThemeContext from '../../context/ThemeContext'
import {SideOptionText, SideLiElem} from '../StyledComponents'

const SideOptions = props => {
  const {uiPath} = props

  return (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme} = value

        return (
          <div className={`side-cont ${darkTheme && 'side-cont-dark'}`}>
            <ul className="side-ul-elem">
              <SideLiElem
                bgColor={uiPath === '/' && (darkTheme ? '#424242' : '#f1f5f9')}
              >
                <button type="button" className="side-li-button">
                  <IoMdHome
                    className={`side-icon ${
                      uiPath === '/' && 'side-active-icon'
                    }`}
                  />
                  <Link to="/" className="side-link-elem">
                    {darkTheme ? (
                      <SideOptionText
                        color={uiPath === '/' ? '#ffffff' : '#f1f1f1'}
                        fontWeight={uiPath === '/' ? '600' : undefined}
                      >
                        Home
                      </SideOptionText>
                    ) : (
                      <SideOptionText
                        color={uiPath === '/' ? '#000000' : '#383838'}
                        fontWeight={uiPath === '/' ? '600' : undefined}
                      >
                        Home
                      </SideOptionText>
                    )}
                  </Link>
                </button>
              </SideLiElem>
              <SideLiElem
                bgColor={
                  uiPath === '/trending' && (darkTheme ? '#424242' : '#f1f5f9')
                }
              >
                <button type="button" className="side-li-button">
                  <HiFire
                    className={`side-icon ${
                      uiPath === '/trending' && 'side-active-icon'
                    }`}
                  />
                  <Link to="/trending" className="side-link-elem">
                    {darkTheme ? (
                      <SideOptionText
                        color={uiPath === '/trending' ? '#ffffff' : '#f1f1f1'}
                        fontWeight={uiPath === '/trending' ? '600' : undefined}
                      >
                        Trending
                      </SideOptionText>
                    ) : (
                      <SideOptionText
                        color={uiPath === '/trending' ? '#000000' : '#383838'}
                        fontWeight={uiPath === '/trending' ? '600' : undefined}
                      >
                        Trending
                      </SideOptionText>
                    )}
                  </Link>
                </button>
              </SideLiElem>
              <SideLiElem
                bgColor={
                  uiPath === '/gaming' && (darkTheme ? '#424242' : '#f1f5f9')
                }
              >
                <button type="button" className="side-li-button">
                  <SiYoutubegaming
                    className={`side-icon ${
                      uiPath === '/gaming' && 'side-active-icon'
                    }`}
                  />
                  <Link to="/gaming" className="side-link-elem">
                    {darkTheme ? (
                      <SideOptionText
                        color={uiPath === '/gaming' ? '#ffffff' : '#f1f1f1'}
                        fontWeight={uiPath === '/gaming' ? '600' : undefined}
                      >
                        Gaming
                      </SideOptionText>
                    ) : (
                      <SideOptionText
                        color={uiPath === '/gaming' ? '#000000' : '#383838'}
                        fontWeight={uiPath === '/gaming' ? '600' : undefined}
                      >
                        Gaming
                      </SideOptionText>
                    )}
                  </Link>
                </button>
              </SideLiElem>
              <SideLiElem
                bgColor={
                  uiPath === '/saved-videos' &&
                  (darkTheme ? '#424242' : '#f1f5f9')
                }
              >
                <button type="button" className="side-li-button">
                  <BiListPlus
                    className={`side-icon ${
                      uiPath === '/saved-videos' && 'side-active-icon'
                    }`}
                  />
                  <Link to="/saved-videos" className="side-link-elem">
                    {darkTheme ? (
                      <SideOptionText
                        color={
                          uiPath === '/saved-videos' ? '#ffffff' : '#f4f4f4'
                        }
                        fontWeight={
                          uiPath === '/saved-videos' ? '600' : undefined
                        }
                      >
                        Saved Videos
                      </SideOptionText>
                    ) : (
                      <SideOptionText
                        color={
                          uiPath === '/saved-videos' ? '#000000' : '#383838'
                        }
                        fontWeight={
                          uiPath === '/saved-videos' ? '600' : undefined
                        }
                      >
                        Saved Videos
                      </SideOptionText>
                    )}
                  </Link>
                </button>
              </SideLiElem>
            </ul>
            <div className="side-bottom-cont">
              <p
                className={`side-bottom-text-1 ${
                  darkTheme && 'side-bottom-text-dark'
                }`}
              >
                CONTACT US
              </p>
              <div>
                <img
                  className="side-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <img
                  className="side-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
                <img
                  className="side-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </div>
              <p
                className={`side-bottom-text-2 ${
                  darkTheme && 'side-bottom-text-dark'
                }`}
              >
                Enjoy! Now to see your channels and recommendations!
              </p>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default SideOptions
