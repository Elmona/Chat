import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 500px;
  height: 80%;
  top: 30px;
  left: 30px;
  margin: 0 auto;
  @media (max-width: 380px) {
    left: 0px;
    width: 100%;
    height: 100%;
    top: 0px;
  }
`

export default Container