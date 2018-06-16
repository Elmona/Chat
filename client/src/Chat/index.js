import React, { Component } from 'react'
import Container from '../styles/Container'
import Messages from './components/messages'
import InputForm from './components/inputForm'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import LongMenu from './components/longMenu'

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

  // TODO: Use smooth scrolling on browsers supporting it.
  scrollBottom() {
    if (this.refChatBottom)
      this.refChatBottom.scrollIntoView()
  }

  componentDidMount() {
    this.socket.on('msg', data => {
      this.setState({ messages: [...this.state.messages, data] })
      this.scrollBottom()
    })

    this.socket.on('connection', data => {
      this.setState({ messages: data.data })
      this.scrollBottom()
    })

    this.socket.on('userCount', data =>
      this.setState({ userCount: data}))
  }

  sendMessage(e) {
    e.preventDefault()
    this.socket.emit('msg', { msg: this.state.msg, avatar: this.state.avatar, nick: this.state.nick, date: Date.now() })
    this.setState({ msg: '' })
    this.scrollBottom()
  }

  setNickName(e) {
    e.preventDefault()
    this.setState({ nick: this.state.tempNick })
  }

  render() {
    return (
      <Container>
        {this.state.nick ? [
          <React.Fragment>
            <Paper zDepth={1} style={{ height: '50px', backgroundColor: '#00bcd4', color: '#FFF', display: 'flex', justifyContent: 'space-between' }}>
              <div>Users online: {this.state.userCount}</div>
              <LongMenu
                changeNick={() => this.setState({ nick: '' })}
              />
            </Paper>
            <Messages
              messages={this.state.messages}
              refChatBottom={r => this.refChatBottom = r}
            />
            <Paper zDepth={3}>
              <InputForm
                onSubmit={e => this.sendMessage(e)}
                onChange={e => this.setState({ msg: e.target.value })}
                value={this.state.msg}
                style={{ width: '95%', marginLeft: '10px' }}
                placeholder='Message'
                fullWidth={true}
              />
            </Paper>
          </React.Fragment>
        ] : (
            <div style={{ display: 'flex', flex: '1', flexDirection: 'column' }}>
              <h1 style={{ textAlign: 'center', paddingTop: '20px' }}>Enter nickname</h1>
              <form
                onSubmit={e => this.setNickName(e)}
                style={{ alignSelf: 'center' }}
              >
                <TextField
                  onChange={e => this.setState({ tempNick: e.target.value })}
                  value={this.state.tempNick}
                  placeholder='Enter Nickname'
                  fullWidth={false}
                />
              </form>
            </div>
          )}
      </Container>
    );
  }
}

export default Chat