import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
      this.state = {
          collapsed: true,
          signedIn: false
      };
      if (localStorage.getItem('user') !== null) {
          this.state.signedIn = true;
      }
      this.navItems = [
          {
          to: "/",
              content: "Home",
              private: false,
                        hideWhenLogged: false
      },
          {
              to: "/counter",
              content: "Counter",
              private: true,
              hideWhenLogged: false
      },
          {
              to: "/fetch-data",
              content: "Fetch data",
              private: false,
              hideWhenLogged: false
      },
          {
              to: "/login",
              content: "Login",
              private: false,
              hideWhenLogged: true
      },
          {
              to: "/register",
              content: "Register",
              private: false,
              hideWhenLogged: true
      },
          {
              to: "/gallery",
              content: "Gallery",
              private: true,
              hideWhenLogged: false
      }
      ]
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Hipstagram</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
                </NavItem>
                {this.state.signedIn &&
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/gallery">Gallery</NavLink>
                </NavItem>
                }

              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
