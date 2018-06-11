import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Container from '../styles/Container'
import AppBar from 'material-ui/AppBar'
import Draggable from 'react-draggable'
import Messages from './components/messages'

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      messages: [
        'Hejsan hejsan',
        'Hejsan hejsan',
        'Hejsan hejsan',
        'Hejsan hejsan'
      ]
    }
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
            <div style={{ height: '500px' }}>
              <Messages
                messages={this.state.messages}
              />
            </div>
            <TextField
              style={{ width: '95%', marginLeft: '10px' }}
              placeholder='Message'
              fullWidth={true}
            />
          </Paper>
        </Draggable>
      </Container>
    );
  }
}

export default Chat