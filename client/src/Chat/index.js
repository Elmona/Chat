import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
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
      messages: [
        { nick: 'Kalle', msg: 'Hejsan hejsan', avatar: 1, date: 1528799686841 },
        { nick: 'Sara', msg: 'Hejsan hejsan', avatar: 2, date: 1528800160757 },
        { nick: 'Lotta', msg: 'Hejsan hejsan', avatar: 3, date: 1528800537469 },
        { nick: 'Adam', msg: 'Hejsan hejsan', avatar: 4, date: 1558800557469 }
      ],
      avatar: Math.floor(Math.random() * 6) + 1,
      nick: '',
      tempNick: ''
    }

    if (process.env.NODE_ENV === 'development') {
      this.socket = io('')
    } else {
      this.socket = io('', { path: '/api/socket.io' })
    }

    this.socket.on('msg', data => {
      this.setState({ messages: [...this.state.messages, data] })
    })
  }

  sendMessage(e) {
    console.log(e)
    e.preventDefault()
    this.socket.emit('msg', { msg: this.state.msg, avatar: this.state.avatar, nick: this.state.nick, date: Date.now() })
    this.setState({ msg: '' })
  }

  setNickName(e) {
    console.log(e)
    e.preventDefault()
    this.setState({ nick: this.state.tempNick })
  }

  render() {
    return (
      <Container>
        <Paper zDepth={3}>
          <AppBar title='Chat' />
          {this.state.nick ? (
            <div>
              <div style={{ height: '500px', overflowX: 'hidden', overflowY: 'auto' }}>
                <Messages
                  messages={this.state.messages}
                />
              </div>
              <InputForm
                onSubmit={e => this.sendMessage(e)}
                onChange={e => this.setState({ msg: e.target.value })}
                value={this.state.msg}
                style={{ width: '95%', marginLeft: '10px' }}
                placeholder='Message'
                fullWidth={true}
              />
            </div>
          ) : (
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <h1 style={{ textAlign: 'center', paddingTop: '10px' }}>Enter nickname</h1>
                <InputForm
                  onSubmit={e => this.setNickName(e)}
                  onChange={e => this.setState({ tempNick: e.target.value })}
                  value={this.state.tempNick}
                  style={{ marginLeft: '50px', marginBottom: '10px' }}
                  placeholder='Enter Nickname'
                  fullWidth={false}
                />
              </div>
            )}
        </Paper>
      </Container>
    );
  }
}

export default Chat