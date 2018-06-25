import React, { Component } from 'react'

class Avatars extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        {this.props.avatars
          .map(x =>
            (<div key={x} style={{ display: 'flex', flexDirection: 'column', padding: '5px' }}
              onClick={() => this.props.onChange(x)}>
              <img width={40} height={40} src={`/pics/avatars/${x}.svg`} alt={x} />
              <input
                type='radio'
                checked={this.props.selectedAvatar === x.toString()}
                onChange={e => this.props.onChange(e.target.value)}
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