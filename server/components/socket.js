
const socket = io => {
  io.on('connection', socket => {
    console.log('Connection')
  })

  socket.on('msg', data => {
    socket.emit('msg', data)
  })
}

module.exports = socket
