import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Chat from './Chat'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

ReactDOM.render(
  <MuiThemeProvider>
    <Chat />
  </MuiThemeProvider>
  , document.getElementById('root'))
