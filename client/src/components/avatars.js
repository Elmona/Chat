import React, { Component } from 'react'

class Avatars extends Component {
  constructor(props) {
    super(props)
    let arr = []
    for (let i = 1; i < 6; i++) {
      arr.push(i)
    }
    this.state = {
      avatars: arr,
      selectedAvatar: '2'
    }
  }

  handleChange = e => {
    this.setState({ selectedAvatar: e.target.value })
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        {this.state.avatars
          .map(x =>
            (<div key={x} style={{ display: 'flex', flexDirection: 'column', padding: '5px' }}
              onClick={() => this.setState({ selectedAvatar: x.toString()})}>
              <img width={30} height={30} src={`/pics/avatars/${x}.svg`} alt={x} />
              <input
                type='radio'
                checked={this.state.selectedAvatar === x.toString()}
                onChange={e => {
                  this.setState({ selectedAvatar: e.target.value })
                }}
                value={x}
                name={x}
              />
            </div>
            ))}
      </div>
    )
  }
}

export default Avatars