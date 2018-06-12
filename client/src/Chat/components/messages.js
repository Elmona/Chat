import React, { Component } from 'react'
import Message from '../styles/message'
import Icon from '../styles/icon'

class Messages extends Component {
  render() {
    const {
      messages
    } = this.props

    return (
      <div>
        {messages.map(x =>
          (<Message>
            <Icon avatar={x.avatar} />
            <div>
              <div>{x.nick}</div>
              <div>{x.msg}</div>
            </div>
          </Message>))}
      </div>
    )
  }
}

export default Messages