const Message = require('../models/message')

const socket = io => {
  io.on('connection', socket => {
    console.log('Connection')

    socket.on('msg', data => {
      // Saving to database
      const message = new Message({
        date: data.date,
        nick: data.nick,
        channel: 'general',
        avatar: data.avatar,
        ip: socket.handshake.headers['x-forwarded-for'],
        userAgent: socket.handshake.headers['user-agent']
      })
      
      message.save()

      io.emit('msg', data)
    })
  })
}

module.exports = socket
