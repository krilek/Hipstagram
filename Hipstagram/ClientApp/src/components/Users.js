import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';

import { userService } from '../services/user.service';

class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: []
        };
    }

    componentDidMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
            users: { loading: true }
        });
        userService.getAll().then(users => this.setState({ users }));
    }
    removeHandler(id) {
        userService.deleteUser(id).then(
            () => {
                if (localStorage.getItem('user') === null) {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                    window.location.reload(true);
                }
            },
            error => this.setState({ error, loading: false })
        );
    }


    render() {
        const { user, users } = this.state;
        return (
            <div className="card">
                <h3 className="card-header text-center font-weight-bold text-uppercase py-4">Users</h3>
                <div className="card-body">
                    <div id="table" className="table-editable">
                        <span className="table-add float-right mb-3 mr-2"><a href="#!" className="text-success"><i
                            className="fas fa-plus fa-2x" aria-hidden="true"></i></a></span>
                        <table className="table table-bordered table-responsive-md table-striped text-center">
                            <thead>
                                <tr>
                                    <th className="text-center">Login</th> 
                                <th className="text-center">Email</th>
                                    <th className="text-center">Admin</th>
                                    <th className="text-center">Edit</th>
                                    <th className="text-center">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length && users.map(user => <tr>
                                    <td className="pt-3-half" contenteditable="true">{user.login}</td> 
                                    <td className="pt-3-half" contenteditable="true"> {user.email}</td>
                                    <td className="pt-3-half" contenteditable="true">
                                        <input className="form-check-input" type="checkbox" defaultChecked={user.isAdmin} disabled/>
                                    </td>
                                    <td>
                                            <span className="table-remove">
                                            <NavLink tag={Link} className="btn btn-primary btn-rounded btn-sm my-0" to={{ pathname: `/editUser/${user.id}`, userDetails: user }} >Edit
                                </NavLink>
                                            </span>
                                    </td>
                                <td>
                                        <span className="table-remove">
                                            <a className="btn btn-danger btn-rounded btn-sm my-0 nav-link" onClick={() => { this.removeHandler(user.id)}}>Remove</a></span>
                                    </td>
                                    </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export { Users };