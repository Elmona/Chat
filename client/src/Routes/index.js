import React, { Component } from 'react'
import Chat from '../Chat'
import Login from '../Login'

class Router extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
      nick: ''
    }
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        {this.state.login ? (
          <Chat nick={this.state.nick} />
        )
          : (
            <Login login={x => {
              console.log(x)
              this.setState({ nick: x, login: true })
            }} />
          )}
      </div>
    )
  }
}

export default Router
