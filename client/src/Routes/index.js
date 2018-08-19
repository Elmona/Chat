import React, { Component } from 'react'
import Chat from '../Chat'
import Login from '../Login'

class Router extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
      nick: '',
      avatar: ''
    }
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        {this.state.login ? (
          <Chat nick={this.state.nick} avatar={this.state.avatar}/>
        )
          : (
            <Login login={(nick, avatar) => {
              this.setState({ nick: nick, avatar: avatar, login: true })
            }} />
          )}
      </div>
    )
  }
}

export default Router
