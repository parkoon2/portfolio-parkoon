import Link from 'next/link'

// class Header extends React.Component {
//   render() {
//     const title = this.props.title
//     return (
//       <>
//         <Link href="/">
//           <a> Home </a>
//         </Link>
//         <Link href="/about">
//           <a> About </a>
//         </Link>
//         <Link href="/portfolios">
//           <a> Portfolio </a>
//         </Link>
//         <Link href="/blogs">
//           <a> Blog </a>
//         </Link>
//         <Link href="/cv">
//           <a> CV </a>
//         </Link>

//         <style jsx>
//           {`
//             a {
//               font-size: 20px;
//             }
//             .customClass {
//               color: red;
//             }
//           `}
//         </style>
//       </>
//     )
//   }
// }

// export default Header

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
                <Link>
                  <a className="nav-link port-navbar-link" href="/">
                    Home
                  </a>
                </Link>
              </NavItem>
              <NavItem className="port-navbar-item">
                <Link>
                  <a className="nav-link port-navbar-link" href="/about">
                    About
                  </a>
                </Link>
              </NavItem>
              <NavItem className="port-navbar-item">
                <Link>
                  <a className="nav-link port-navbar-link" href="/portfolios">
                    Portfolio
                  </a>
                </Link>
              </NavItem>
              <NavItem className="port-navbar-item">
                <Link>
                  <a className="nav-link port-navbar-link" href="/blogs">
                    Blog
                  </a>
                </Link>
              </NavItem>
              <NavItem className="port-navbar-item">
                <Link>
                  <a className="nav-link port-navbar-link" href="/cv">
                    CV
                  </a>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
