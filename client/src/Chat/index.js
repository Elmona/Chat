import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Container from '../styles/Container'
import AppBar from 'material-ui/AppBar'
import Draggable from 'react-draggable'
import Messages from './components/messages'

import io from 'socket.io-client'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: '',
      messages: [
        'Hejsan hejsan',
        'Hejsan hejsan',
        'Hejsan hejsan',
        'Hejsan hejsan'
      ]
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
    e.preventDefault()
    this.socket.emit('msg', this.state.msg)
    this.setState({ msg: '' })
  }

  render() {
    return (
      <Container>
        <Draggable
          handle='.handle'
        >
          <Paper zDepth='3'>
            <AppBar
              className='handle'
              title='Chat'
            />
            <div style={{ height: '500px', overflowX: 'hidden', overflowY: 'auto' }}>
              <Messages
                messages={this.state.messages}
              />
            </div>
            <form onSubmit={e => this.sendMessage(e)}>
              <TextField
                value={this.state.msg}
                onChange={e => this.setState({ msg: e.target.value })}
                style={{ width: '95%', marginLeft: '10px' }}
                placeholder='Message'
                fullWidth={true}
              />
            </form>
          </Paper>
        </Draggable>
      </Container>
    );
  }
}

export default Chat