const app = require('express')()
const express = require('express')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const socket = require('./components/socket')

const port = 3001

socket(io)

server.listen(port, () => console.log('Server is running on port', port))