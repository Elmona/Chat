const Message = require('../models/message')

const socket = io => {
  io.on('connection', socket => {
    let userCount = io.engine.clientsCount
    io.sockets.emit('userCount', userCount)

    // On connect send the 50 latest messages to chat.
    Message
      .find({ channel: 'general' })
      .limit(50)
      .sort({ '_id': -1 })
      .then(data => {
        // Clean data don't send ip and user-agent to clients.
        data = data
          .reverse()
          .map(x => ({
            id: x.id,
            msg: x.msg,
            date: x.date,
            nick: x.nick,
            channel: x.channel,
            avatar: x.avatar,
          }))
        socket.emit('connection', { data: data })
      })

    socket.on('msg', data => {
      // Saving to database
      new Message({
        date: data.date,
        nick: data.nick,
        msg: data.msg,
        channel: 'general',
        avatar: data.avatar,
        ip: socket.handshake.headers['x-forwarded-for'],
        userAgent: socket.handshake.headers['user-agent']
      }).save()

      io.sockets.emit('msg', data)
    })
  })
  
  // TODO: Maybe send userCount every ten seconds. It doesn't seems that this triggers all the time
  io.on('disconnect', () =>
    io.emit('userCount', userCount))
}

module.exports = socket
