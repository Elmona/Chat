import React,  { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

const iconButtonElement = (
  <IconButton>
    <MoreVertIcon />
  </IconButton>
)

class LongMenu extends Component {
  render() {
    const {
      changeNick
    } = this.props

    return (
      <IconMenu iconButtonElement={iconButtonElement}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={() => changeNick()}>Change Nickname</MenuItem>
      </IconMenu >
    )
  }
}

export default LongMenu
