import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
class RegisterPage extends Component {

  state = {
    userName: '',
    email: '',
    password: '',
    errors: {
      userName: false,
      email: false,
      password: false,
    }
  }
  messages = {
    username_incorrect: "login should have 5 characters and should not contain spaces",
    email_incorrect: "Email should have @",
    password_incorrect: "Passowrd should have 8 characters minimum",
  }

  handleChange = (e) => {

      const name = e.target.name;
      const type = e.target.type;
      if(type === "text" || type === "password" || type === "email") {
        const value = e.target.value;
        this.setState({
          [name]: value
        })
      } 
    }



  handleSubmit = (e) => {
    e.preventDefault()
    const validation = this.formValidation()
    console.log(validation)
    if (validation.correct) {
      this.setState({
        userName: '',
        email: '',
        password: '',
          message: "Complete",
          errors: {
            userName: false,
            email: false,
            password: false,
          }
      })
    } else {
      this.setState({
        errors: {
          userName: !validation.username,
          email: !validation.email,
          password: !validation.password,
        }
      })
    }

  }
  formValidation = () => {
    let username = false;
    let email = false;
    let password = false;
    let correct = false;
    if(this.state.userName.length > 5 && this.state.userName.indexOf(' ') === -1){
      username = true;
    }
    if(this.state.email.indexOf('@') !== -1) {
      email = true;
    }
    if(this.state.password.length > 8) {
      password = true;
    }
    if(username && email && password  ) {
      correct = true;
    }
    return ({
      correct,
      username,
      email,
      password,
    })
  }

  componentDidUpdate() {
      if(this.state.message !== '') {
          setTimeout( ()=> this.setState({
              message: ''
          }),10000)
      }
  }

    render() {
    return (

 
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className='form-group'>
              <label htmlFor="user"> Login:
                  <input type="text"
                         id="user"
                         name="userName"
                         value={this.state.userName}
                         onChange={this.handleChange}
                         className="form-control"  /> 
                            {this.state.errors.userName &&
                            <div className="help-block">{this.messages.username_incorrect}</div>
                            }
              </label>
          </div>

           <div className="form-group">
              <label htmlFor="password"> Password:
                <input type="password"
                       id="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      className="form-control" />
                      
                      {this.state.errors.userName &&
                      <div className="help-block">{this.messages.password_incorrect}</div>
                      }    
                  </label>        
            </div>
                <div className="form-group"> 
                  <label htmlFor="email">Email:
                      <input type="email"
                          id="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                           className="form-control"/>
            
                          {this.state.errors.userName &&
                          <div className="help-block">{this.messages.email_incorrect}</div>
                          }
                    </label>
                </div>
                <div className="form-group">
                      <button className="btn btn-primary register ">Register</button>
                </div>
                      {this.state.message && 
                      <div className="form-row"> 
                        <div className="alert alert-success" role="alert">
                        <p className="alert-heading text-center">{this.state.message}!</p>
                        </div>
                        <NavLink tag={Link} className="text-dark goToLogin" to="/login">Go To Login</NavLink>
                      </div>}
        </form>
       </div>
    );
  }
}

export { RegisterPage } ;
