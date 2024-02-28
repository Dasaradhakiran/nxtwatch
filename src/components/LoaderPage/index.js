import Loader from 'react-loader-spinner'

import ThemeContext from '../../context/ThemeContext'
import './index.css'

const LoaderPage = () => (
  <ThemeContext.Consumer>
    {value => {
      const {darkTheme} = value
      return (
        <div className="loader-container" data-testid="loader">
          <Loader
            type="ThreeDots"
            color={darkTheme ? '#ffffff' : '#000000'}
            height="50"
            width="50"
          />
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default LoaderPage
