import React, { Component } from 'react'
import Message from '../styles/message'
import Icon from '../styles/icon'
import Background from '../styles/background'

const formatDate = date => {
  const time = new Date(date)
  return `${time.getHours()}:${time.getMinutes()}`
}

class Messages extends Component {
  render() {
    const {
      messages,
      refChatBottom
    } = this.props

    return (
     <Background>
        {messages.map(x =>
          (<Message>
            <Icon avatar={x.avatar} />
            <div>
              <div>
                <span style={{ fontWeight: 'bold' }}>{x.nick}</span>
                <span style={{
                  fontStyle: 'italic',
                  marginLeft: '5px',
                  fontSize: '80%'
                }}>
                  {formatDate(x.date)}</span>
              </div>
              <div>{x.msg}</div>
            </div>
          </Message>))}
        {/* A reference to the bottom of the chat. */}
        <div ref={refChatBottom}></div>
      </Background>
    )
  }
}

export default Messages