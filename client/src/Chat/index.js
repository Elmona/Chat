import React, { Component } from 'react'
import Container from '../styles/Container'
import Messages from './components/messages'
import InputForm from './components/inputForm'
import Paper from 'material-ui/Paper'
import LongMenu from './components/longMenu'
import Header from './styles/header'

import io from 'socket.io-client'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: '',
      messages: [],
      avatar: props.avatar,
      nick: props.nick,
    }

    if (process.env.NODE_ENV === 'development') {
      this.socket = io('http://localhost:9001')
    } else {
      // this.socket = io('', { path: '/api/socket.io' })
      this.socket = io('')
    }
  }

  // TODO: Use smooth scrolling on browsers supporting it.
  scrollBottom() {
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
      this.setState({ userCount: data }))
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
        <React.Fragment>
          <Header>
            <p>Should be something here.</p>
            <div style={{ alignSelf: 'center' }}>
              Users online: {this.state.userCount}
            </div>
            <LongMenu
              changeNick={() => console.log('Not implemented yet.')}
            />
          </Header>
          <Messages
            messages={this.state.messages}
            refChatBottom={r => this.refChatBottom = r}
          />
          <Paper zDepth={3}>
            <InputForm
              name='input'
              onSubmit={e => this.sendMessage(e)}
              onChange={e => this.setState({ msg: e.target.value })}
              value={this.state.msg}
              style={{ width: '95%', marginLeft: '10px' }}
              placeholder='Message'
              fullWidth={true}
            />
          </Paper>
        </React.Fragment>
      </Container>
    );
  }
}

export default Chat