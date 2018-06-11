import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './App.css'
import Chat from './Chat'
import registerServiceWorker from './registerServiceWorker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

ReactDOM.render(
  <MuiThemeProvider>
    <Chat />
  </MuiThemeProvider>
  , document.getElementById('root'));

registerServiceWorker();
