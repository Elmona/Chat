import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import Chat from './Chat'
import Router from './Routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

ReactDOM.render(
  <MuiThemeProvider>
    <Router />
  </MuiThemeProvider>
  , document.getElementById('root'))
