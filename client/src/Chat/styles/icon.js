import styled from 'styled-components'

const Icon = styled.div`
  display: inline-block;
  width: 35px;
  height: 35px;
  background-image: url('/pics/avatars/${props => props.avatar}.svg');
  background-repeat: no-repeat;
  background-size: 35px 35px;
`

export default Icon
