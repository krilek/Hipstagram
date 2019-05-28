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
              private: true,
                        hideWhenLogged: false
      },
          {
            to: "/photoUpload",
            content: "New photo",
            private: true,
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
          },
          {
              to: "/login",
              content: "Logout",
              private: true,
              hideWhenLogged: false
          },
          {
              to: "/logs",
              content: "Logs",
              private: false,
              hideWhenLogged: false
          },
          {
              to: "/users",
              content: "Users",
              private: false,
              hideWhenLogged: false
          },
      ]
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

    render() {
        const navigation = this.navItems.map((navItem, i) => {
            if (this.state.signedIn && navItem.private || this.state.signedIn && !navItem.hideWhenLogged || !this.state.signedIn && !navItem.private) {
                return (< NavItem key= { i } >  < NavLink
                tag = { Link }
                className = "text-dark"
                to = { navItem.to } > { navItem.content } </NavLink >  </NavItem > )

            } else {
                return
            }


        })

    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Hipstagram</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                            {navigation}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
