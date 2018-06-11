import React, { Component } from 'react'
import Message from '../styles/message'


class Messages extends Component {
  render() {
    const {
      messages
    } = this.props

    return (
      <div>
        {messages.map(x => 
          (<Message>{x}</Message>))}
      </div>
    )
  }
}

export default Messages