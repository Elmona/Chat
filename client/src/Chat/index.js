import React, { Component } from 'react'
import Container from '../styles/Container'
import AppBar from 'material-ui/AppBar'
import Messages from './components/messages'
import InputForm from './components/inputForm'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'

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
    // this.refChatBottom = React.createRef()
  }

  componentDidMount() {
    this.socket.on('msg', data => {
      this.setState({ messages: [...this.state.messages, data] })
      // this.refMessages.scrollIntoView({ behavior: 'smooth '})
    })

    this.socket.on('connection', data => {
      console.log('New messages from server')
      this.setState({ messages: data.data })
      // this.refMessages.scrollIntoView({ behavior: 'smooth '})
      console.log(this.refChatBottom)
    })
  }

  sendMessage(e) {
    console.log(e)
    e.preventDefault()
    this.socket.emit('msg', { msg: this.state.msg, avatar: this.state.avatar, nick: this.state.nick, date: Date.now() })
    this.setState({ msg: '' })
    // this.refMessages.scrollIntoView({ behavior: 'smooth '})
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
              refChatBottom={r => console.log('blahahaaa', r)}
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
        ) : (
            <div style={{ display: 'flex', flex: '1', flexDirection: 'column' }}>
              <h1 style={{ textAlign: 'center', paddingTop: '20px' }}>Enter nickname</h1>
              <form
                onSubmit={e => this.setNickName(e)}
                style={{ alignSelf: 'center' }}
              >
                <TextField
                  onChange={e => this.setState({ tempNick: e.target.value })}
                  value={this.state.tempNick}
                  style={{ alignSelf: 'center' }}
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