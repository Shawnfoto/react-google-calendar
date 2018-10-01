import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// lib
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <NavItem>
            {/* <NavLink href="/auth/google">Login With Google</NavLink> */}
            <NavLink href="/Login">Login</NavLink>
          </NavItem>
          // <li>
          //   <a href="/auth/google">Login With Google</a>
          // </li>
        );
      default:
        return [
          // <NavItem key="2">
          //   <NavLink href="/api/logout">
          //     <div className="title">{this.props.auth.googleEmails}</div>
          //     Logout
          //   </NavLink>
          // </NavItem>

          // li
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {this.props.auth.googleEmails}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              {/* <DropdownItem>Logout</DropdownItem> */}
              <NavLink href="/api/logout">Logout</NavLink>
            </DropdownMenu>
          </UncontrolledDropdown>
          // <li key="1">{this.props.auth.googleEmails}</li>,
          // <li key="2">
          //   <a href="/api/logout">Logout</a>
          // </li>
        ];
    }
  }
  render() {
    return (
      // <nav>
      //   <header className="nav-wrapper">
      //     {console.log("this.props.auth", this.props.auth)}
      //     <Link
      //       to={this.props.auth ? `/surveys` : "/"}
      //       className="left brand-logo"
      //     >
      //       Calendar
      //     </Link>
      //     <ul className="right">{this.renderContent()}</ul>
      //   </header>
      // </nav>
      // <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href={this.props.auth ? `/surveys` : "/"}>
          Calendar
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {this.renderContent()}
          </Nav>
        </Collapse>
      </Navbar>
      // </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);
