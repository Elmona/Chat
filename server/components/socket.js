const Message = require('../models/message')

const socket = io => {
  io.use((socket, next) => {
    let data = socket.handshake.query
    console.log(data)
    next()
  })
  const getUserListAsArray = () =>
    Object.keys(io.sockets.sockets)
      .map(x => io.sockets.sockets[x].nickname)

  io.on('connection', socket => {
    // console.log(socket)
    let userCount = io.engine.clientsCount
    socket.nickname = 'temp'
    io.emit('userCount', userCount)
    io.emit('userList', getUserListAsArray())

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

    socket.on('nick', data => {
      socket.nickname = data.nick
    })
  
    socket.on('msg', data => {
      // Saving to database
      new Message({
        date: data.date,
        nick: data.nick,
        msg: data.msg,
        channel: 'general',
        avatar: data.avatar,
        ip: 'unknown', 
        userAgent: socket.handshake.headers['user-agent']
      }).save()

      io.sockets.emit('msg', data)
    })
  })

  io.on('disconnect', () => {
    io.emit('userCount', userCount)
    io.emit('userList', getUserListAsArray())
  })
}

module.exports = socket
