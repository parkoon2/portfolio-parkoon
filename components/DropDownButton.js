import React from 'react'
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

export default class DropDownButton extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  renderDropItem = items => {
    return (
      <DropdownMenu>
        {items.map((item, index) => (
          <DropdownItem key={index}>
            <div onClick={item.handlers.onClick}>{item.text}</div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    )
  }

  render() {
    const { items } = this.props
    return (
      <ButtonDropdown
        className="dropdown-btn"
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle caret size="sm" />
        {this.renderDropItem(items)}
      </ButtonDropdown>
    )
  }
}
