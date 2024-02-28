import styled from 'styled-components'

import './index.css'

const FailureView = props => {
  const {darkTheme, clickRetry} = props

  const ErrorHead = styled.h1`
    font-family: 'Roboto';
    color: ${darkTheme ? '#ffffff' : '#383838'};
    font-size: 20px;
  `
  const ErrorText = styled.p`
    font-family: 'Roboto';
    color: #606060;
    font-size: 15px;
    margin-top: 0px;
    margin-bottom: 5px;
  `
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
      <ErrorHead>Oops! Something Went Wrong</ErrorHead>
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
