import React from 'react';
import { userService } from '../services/user.service';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }
        this.setState({ loading: true });
        userService.login(username, password)
            .then(
                () => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                    window.location.reload(true);
                },
                error => this.setState({ error, loading: false })
            );
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;
        return (

                <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="username"><i class="fas fa-user"></i> Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <small className="form-text text-muted">Username is required</small>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password"><i class="fas fa-key"></i> Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&

                        <small className="form-text text-muted">Password is required</small>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary register" disabled={loading}><i class="fas fa-sign-in-alt"></i> Login</button>
                    </div>
                    {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                    }
                </form>
                </div>


        );
    }
}

export { LoginPage };