import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
export class SingleGalleryViev extends Component {
   

    componentDidMount() {
        console.log(this.props.location.state);
    }
    
    render() {
        return (
             <div>
                 {/* <NavLink tag={Link} className="text-dark goToLogin" to={{pathname: `/singlegallery/${id}`, state: id}}>{props.data}</NavLink> */}
             </div>
        );
    }
   
}

         
     

