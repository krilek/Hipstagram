import React from 'react';
import { Link } from 'react-router-dom';
import { ListOfPhotos } from './ListOfPhotos'
import { userService } from '../services/user.service';

class HomePage extends React.Component {
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
    }

    handleClick = (e) => {
        //Todo handle showing photo
    }
    render() {
        const {user, users} = this.state
        return (
            <div className="col-md-12">
                <h1>Hi {user.login}!</h1>
                <ListOfPhotos handlePhotoClick={this.handleClick}></ListOfPhotos>
            </div>
        );
    }
}

export { HomePage };