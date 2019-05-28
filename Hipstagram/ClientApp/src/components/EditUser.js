import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
class EditUser extends Component {
    constructor(props) {
        super(props);
        const emptyRequest = props.location.userDetails == null;
        this.state = {
            editedUser: props.match.params.id,
            Login: emptyRequest ? '' : props.location.userDetails.login,
            Email: emptyRequest ? '' : props.location.userDetails.email,
            Password: '',
            errors: {
                Login: false,
                Email: false,
                Password: false,
            },
            
        }
    }
  messages = {
    username_incorrect: "Login should at least have 3 characters",
    email_incorrect: "Incorrect email",
    password_incorrect: "Password should at least have 4 characters"
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
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    validateLogin(login) {
        return /^[a-zA-Z0-9]{4,}$/.test(login);
    }

  handleSubmit = (e) => {
    e.preventDefault()
    const validation = this.formValidation()
    console.log("Validation", validation);
    if (validation.correct) {
        const userData = {
            Email: this.state.Email,
            Login: this.state.Login,
            Password: this.state.Password,
            Id: this.state.editedUser
        }
        this.updateUser(userData).then((response) => {
            if (response.ok) {
                this.setState({
                    message: "Updated"
                })
                setTimeout(() => this.setState({
                        message: ''
                    }),
                    10000)
            } else {
                this.setState({
                    message: "Something went wrong. Try again!"
                })
                setTimeout(() => this.setState({
                        message: ''
                    }),
                    10000)
            }
        },
            error => {
                this.setState({ message: "Something went wrong. Try again!" });
                setTimeout(() => this.setState({
                    message: ''
                }), 10000)
            }
        );
      this.setState({
        Login: '',
        Email: '',
        Password: '',

          errors: {
            Login: false,
            Email: false,
            Password: false,
          }
      })
    } else {
        this.setState({
        errors: {
            Login: !validation.Login,
            Email: !validation.Email,
            Password: !validation.Password
        }
        })
    }

  }

    updateUser(data) {
        return fetch(`/api/users/${this.state.editedUser}/`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    }
  formValidation = () => {
      let Login = this.validateLogin(this.state.Login);
      let Email = this.validateEmail(this.state.Email);
      let Password = this.state.Password.length >= 4;
      let correct = Login && Email && Password;

    return ({
      correct,
      Login,
      Email,
      Password
    })
  }


    render() {
    return (
      <div className="col-md-6 col-md-offset-3">

        <form onSubmit={this.handleSubmit} noValidate>
          <div className='form-group'>
              <label htmlFor="user"> Login:</label>
              <input type="text"
                         id="user"
                         name="Login"
                         value={this.state.Login}
                         onChange={this.handleChange}
                         className="form-control"  />
          {this.state.errors.Login &&
              <small className="form-text text-muted">{this.messages.username_incorrect}</small>
           }
          </div>

           <div className="form-group">
                    <label htmlFor="password"> Password:</label>
                <input type="password"
                       id="password"
                      name="Password"
                      value={this.state.Password}
                      onChange={this.handleChange}
                      className="form-control" />

                      {this.state.errors.Password &&
                    <small className="form-text text-muted">{this.messages.password_incorrect}</small>
                      }

            </div>
                <div className="form-group">

                    <label htmlFor="email">Email:</label>
                      <input type="email"
                          id="email"
                          name="Email"
                          value={this.state.Email}
                          onChange={this.handleChange}
                           className="form-control"/>

                          {this.state.errors.Email &&
    <small className="form-text text-muted">{this.messages.email_incorrect}</small>
                          }
                </div>
                <div className="form-group">
                      <button className="btn btn-primary register">Register</button>
                </div>
                      {this.state.message &&
                      <div className="form-row">
                        <div className="alert alert-success" role="alert">
    <NavLink tag={Link} className="text-dark goToLogin" to="/login"><p className="alert-heading text-center">{this.state.message}</p></NavLink>

                        </div>
                      </div>}
        </form>
       </div>
    );
  }
}

export { EditUser } ;
