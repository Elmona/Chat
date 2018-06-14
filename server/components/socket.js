const Message = require('../models/message')

const socket = io => {
  io.on('connection', socket => {
    // On connect send the 50 latest messages to chat.
    Message
      .find({ channel: 'general' })
      .sort({ 'date': 1 })
      .limit(50)
      .then(data => {
        // Clean data don't send ip and user-agent to clients.
        data = data.map(x => ({
          id: x.id,
          msg: x.msg,
          date: x.date,
          nick: x.nick,
          channel: x.channel,
          avatar: x.avatar,
        }))
        console.log('sending to client', data)
        socket.emit('connection', { data: data})
      })
    socket.on('msg', data => {
      // Saving to database
      const message = new Message({
        date: data.date,
        nick: data.nick,
        msg: data.msg,
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
