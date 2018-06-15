import React, { Component } from 'react'
import Message from '../styles/message'
import Icon from '../styles/icon'

// TODO: Rewrite this
const formatDate = date =>
  new Date(date)
    .toLocaleTimeString('sv', { hour: '2-digit', minute: '2-digit' })

class Messages extends Component {
  render() {
    const {
      messages,
      refChatBottom
    } = this.props

    return (
      <div style={{ flex: '1', overflowX: 'hidden', overflowY: 'auto' }}>
        {messages.map(x =>
          (<Message>
            <Icon avatar={x.avatar} />
            <div>
              <div>
                <span style={{ fontWeight: 'bold' }}>{x.nick}</span>
                <span style={{ fontStyle: 'italic', marginLeft: '5px', fontSize: '80%' }}>{formatDate(x.date)}</span>
              </div>
              <div>{x.msg}</div>
            </div>
          </Message>))}
        <div ref={refChatBottom} style={{ height: '1px' }}></div>
      </div>
    )
  }
}

export default Messages