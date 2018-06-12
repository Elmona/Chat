import React, { Component } from 'react'
import Message from '../styles/message'
import Icon from '../styles/icon'

const formatDate = date =>
  new Date(date).toLocaleTimeString('sv', { hour: '2-digit', minute: '2-digit' })

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
              <div>
                <span style={{ fontWeight: 'bold' }}>{x.nick}</span>
                <span style={{ fontStyle: 'italic', marginLeft: '5px'}}>{formatDate(x.date)}</span>
              </div>
              <div>{x.msg}</div>
            </div>
          </Message>))}
      </div>
    )
  }
}

export default Messages