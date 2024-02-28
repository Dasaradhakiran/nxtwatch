import styled from 'styled-components'

export const SideOptionText = styled.p`
  font-family: 'Roboto';
  font-size: 15px;
  color: ${props => props.color};
  font-weight: ${props => props.fontWeight};
  padding: 0px;
  margin: 0px;
`

export const SideLiElem = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${props => props.bgColor};
`
