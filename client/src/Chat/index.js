import React, { Component } from 'react'
import Container from '../styles/Container'
import AppBar from 'material-ui/AppBar'
import Messages from './components/messages'
import InputForm from './components/inputForm'

import io from 'socket.io-client'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: '',
      messages: [],
      avatar: Math.floor(Math.random() * 6) + 1,
      nick: 'Emil',
      tempNick: ''
    }

    if (process.env.NODE_ENV === 'development') {
      this.socket = io('')
    } else {
      this.socket = io('', { path: '/api/socket.io' })
    }
  }

  componentDidMount() {
    this.socket.on('msg', data => {
      this.setState({ messages: [...this.state.messages, data] })
    })

    this.socket.on('connection', data => {
      console.log('New messages from server')
      this.setState({ messages: data.data })
    })
  }

  sendMessage(e) {
    console.log(e)
    e.preventDefault()
    this.socket.emit('msg', { msg: this.state.msg, avatar: this.state.avatar, nick: this.state.nick, date: Date.now() })
    this.setState({ msg: '' })
  }

  setNickName(e) {
    e.preventDefault()
    this.setState({ nick: this.state.tempNick })
  }

  render() {
    return (
      <Container>
        <AppBar title='Chat' />
        {this.state.nick ? (
          <React.Fragment>
            <Messages
              messages={this.state.messages}
            />
            <InputForm
              onSubmit={e => this.sendMessage(e)}
              onChange={e => this.setState({ msg: e.target.value })}
              value={this.state.msg}
              style={{ width: '95%', marginLeft: '10px' }}
              placeholder='Message'
              fullWidth={true}
            />
          </React.Fragment>
        ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1 style={{ textAlign: 'center', paddingTop: '20px' }}>Enter nickname</h1>
              <InputForm
                onSubmit={e => this.setNickName(e)}
                onChange={e => this.setState({ tempNick: e.target.value })}
                value={this.state.tempNick}
                style={{ marginLeft: '50px', marginBottom: '10px', alignSelf: 'center', justifyContent: 'center' }}
                placeholder='Enter Nickname'
                fullWidth={false}
              />
            </div>
          )}
      </Container>
    );
  }
}

export default Chat