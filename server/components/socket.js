
const socket = io => {
  io.on('connection', socket => {
    console.log('Connection')
  })
}

module.exports = socket
