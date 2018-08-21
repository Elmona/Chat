
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'

class inputForm extends Component {
  render() {
    const {
      name,
      value,
      onSubmit,
      onChange,
      style,
      placeholder,
      fullWidth = false
    } = this.props

    return (
      <form onSubmit={e => onSubmit(e)}>
        <TextField
          name={name}
          value={value}
          onChange={onChange}
          style={style}
          placeholder={placeholder}
          fullWidth={fullWidth}
        />
      </form>
    )
  }
}

export default inputForm