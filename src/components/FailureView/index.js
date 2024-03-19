import {ErrorHead, ErrorText} from '../StyledComponents'

import './index.css'

const FailureView = props => {
  const {darkTheme, clickRetry} = props

  return (
    <div className="error-cont">
      <img
        className="error-image"
        src={
          darkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        }
        alt="failure view"
      />
      <ErrorHead color={darkTheme ? '#ffffff' : '#383838'}>
        Oops! Something Went Wrong
      </ErrorHead>
      <ErrorText>
        We are having some trouble to complete your request.
      </ErrorText>
      <ErrorText>Please try again.</ErrorText>
      <button className="error-button" type="button" onClick={clickRetry}>
        Retry
      </button>
    </div>
  )
}

export default FailureView
