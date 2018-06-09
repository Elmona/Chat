import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  width: 500px;
  top: 60px;
  left: 80px;
  margin: 0 auto;
  @media (max-width: 380px) {
    width: 95%;
    top: 5px;
  }
  @media (max-width: 320px) {
    width: 100%;
    top: 0px;
  }
`

export default Container