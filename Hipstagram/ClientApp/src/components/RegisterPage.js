import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
class RegisterPage extends Component {

  state = {
    Login: '',
    Email: '',
    Password: '',
    errors: {
      Login: false,
      Email: false,
      Password: false,
    }
  }
  messages = {
    username_incorrect: "Login should have 5 characters and should not contain spaces",
    email_incorrect: "Email should have @",
    password_incorrect: "Password should have 8 characters minimum"
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
        Login: '',
        Email: '',
        Password: '',
          message: "Complete",
          errors: {
            Login: false,
            email: false,
            Password: false,
          }
      })
   
      
    } else {
      this.setState({
        errors: {
          Login: !validation.username,
          Email: !validation.email,
          Password: !validation.password,
        }
      })
    }
  
    fetch('https://localhost:5001/api/users/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: this.state.Email,
        Login: this.state.Login,
        Password: this.state.Password,
      })
    })
  
  }
  formValidation = () => {
    let Login = false;
    let Email = false;
    let Password = false;
    let correct = false;
    if(this.state.Login.length > 5 && this.state.Login.indexOf(' ') === -1){
      Login = true;
    }
    if(this.state.Email.indexOf('@') !== -1) {
      Email = true;
    }
    if(this.state.Password.length > 8) {
      Password = true;
    }
    if(Login && Email && Password  ) {
      correct = true;
    }
    return ({
      correct,
      Login,
      Email,
      Password,
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
                         name="Login"
                         value={this.state.Login}
                         onChange={this.handleChange}
                         className="form-control"  /> 
                            {this.state.errors.Login &&
                            <div className="help-block">{this.messages.username_incorrect}</div>
                            }
              </label>
          </div>

           <div className="form-group">
              <label htmlFor="password"> Password:
                <input type="password"
                       id="password"
                      name="Password"
                      value={this.state.Password}
                      onChange={this.handleChange}
                      className="form-control" />
                      
                      {this.state.errors.Password &&
                      <div className="help-block">{this.messages.password_incorrect}</div>
                      }    
                  </label>        
            </div>
                <div className="form-group"> 
                  <label htmlFor="email">Email:
                      <input type="email"
                          id="email"
                          name="Email"
                          value={this.state.email}
                          onChange={this.handleChange}
                           className="form-control"/>
            
                          {this.state.errors.Email &&
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
