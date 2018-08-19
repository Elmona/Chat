const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const socket = require('./components/socket')
const mongoose = require('./config/mongoose.js')

const port = process.env.PORT || 8080 

app.use('/ping', (req, res) => {
  console.log('wohooo')
  res.send('wohoo')
})
// Connect to mongodb database
mongoose.run().catch(err => {
  console.log(err)
  process.exit(1)
})

socket(io)

server.listen(port, () => console.log('Server is running on port', port))
