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
class Login extends React.Component {
  render() {
    return (
      <a
        onClick={() => {
          auth0.login()
        }}
        className="nav-link port-navbar-link clickable"
        // href="/"
      >
        LOGIN
      </a>
    )
  }
}

const Logout = () => {
  return <a className="nav-link port-navbar-link clickable">LOGOUT</a>
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
                <Link href="/">
                  <a className="nav-link port-navbar-link clickable">HOME</a>
                </Link>
              </NavItem>
              <NavItem className="port-navbar-item">
                <Link href="/about">
                  <a className="nav-link port-navbar-link clickable">ABOUT</a>
                </Link>
              </NavItem>
              <NavItem className="port-navbar-item">
                <Link href="/portfolios">
                  <a className="nav-link port-navbar-link clickable">
                    PORTFOLIO
                  </a>
                </Link>
              </NavItem>
              <NavItem className="port-navbar-item">
                <Link href="/blog">
                  <a className="nav-link port-navbar-link clickable">BLOG</a>
                </Link>
              </NavItem>
              <NavItem className="port-navbar-item">
                <Link href="/cv">
                  <a className="nav-link port-navbar-link clickable">CV</a>
                </Link>
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
