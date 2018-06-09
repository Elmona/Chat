import React, { Component } from 'react'
import './App.css'
import Paper from 'material-ui/Paper'
import Container from './styles/Container'
import AppBar from 'material-ui/AppBar'


class App extends Component {
  render() {
    return (
      <Container>
        <Paper>
        <AppBar 
          title='Chat'
        />
        <h1 ClassName="App-logo">Chat</h1>
        </Paper>
      </Container>
    );
  }
}

export default App
