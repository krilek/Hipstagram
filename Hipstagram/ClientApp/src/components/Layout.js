import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = props
    }
    
  static displayName = Layout.name;

  render () {
    return (
      <div>
            <NavMenu signedIn={this.state.signedIn} handleLogout={this.state.handleLogout} />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
