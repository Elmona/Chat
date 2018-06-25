import React, { Component } from 'react'
import Container from '../styles/Container'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Avatars from '../components/avatars'

class Login extends Component {
  constructor(props) {
    super(props)

    let arr = []
    for (let i = 1; i < 6; i++) {
      arr.push(i)
    }

    this.state = {
      login: this.props.login,
      avatars: arr,
      selectedAvatar: '2',
      nick: '',
    }
  }

  render() {
    return (
      <Container>
        <div style={{ display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center' }}>
          <form
            onSubmit={e => {
              e.preventDefault()
              this.props.login(this.state.nick, this.state.selectedAvatar)
            }}
            style={{ alignSelf: 'center' }}
          >
            <Paper
              style={{ padding: '30px' }}
              zDepth={5}
            >
              <Avatars
                avatars={this.state.avatars}
                selectedAvatar={this.state.selectedAvatar}
                onChange={e => this.setState({ selectedAvatar: e.toString() })}
              />
              <TextField
                style={{ backgroundColor: '#FFF' }}
                onChange={e => this.setState({ nick: e.target.value })}
                value={this.state.nick}
                floatingLabelText='Enter Nickname'
                fullWidth={false}
              />
            </Paper>
          </form>
        </div>
      </Container>
    )
  }
}

export default Login