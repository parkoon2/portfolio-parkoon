import Link from 'next/link'
import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

import auth0 from '../../services/auth0'

const Menu = ({ title }) => {
  return (
    <Link>
      <a className="nav-link port-navbar-link clickable" href="/">
        {title}
      </a>
    </Link>
  )
}

const Login = () => {
  return (
    <Link>
      <a
        onClick={auth0.login}
        className="nav-link port-navbar-link clickable"
        href="/"
      >
        LOGIN
      </a>
    </Link>
  )
}

const Logout = () => {
  return (
    <Link>
      <a className="nav-link port-navbar-link clickable" href="/">
        LOGOUT
      </a>
    </Link>
  )
}

export default class Example extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (
      <div>
        <Navbar
          className="port-navbar port-default absolute"
          color="transparent"
          dark
          expand="md"
        >
          <NavbarBrand className="port-navbar-brand" href="/">
            PARKOON
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="port-navbar-item">
                <Menu title={'HOME'} />
              </NavItem>
              <NavItem className="port-navbar-item">
                <Menu title={'ABOUT'} />
              </NavItem>
              <NavItem className="port-navbar-item">
                <Menu title={'PORTFOLIO'} />
              </NavItem>
              <NavItem className="port-navbar-item">
                <Menu title={'BLOG'} />
              </NavItem>
              <NavItem className="port-navbar-item">
                <Menu title={'CV'} />
              </NavItem>
              <NavItem className="port-navbar-item">
                <Login />
              </NavItem>
              <NavItem className="port-navbar-item">
                <Logout />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
