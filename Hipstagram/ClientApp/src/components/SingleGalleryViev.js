import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ListOfPhotos } from './ListOfPhotos'
export class SingleGalleryViev extends Component {
   

    componentDidMount() {
        console.log(this.props.location.state);
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                <div className="col-sm-6 col-md-4 py-5 " > 
                 <h5 >Gallery number: {this.props.location.state}</h5>
                <NavLink tag={Link} className="text-dark goToLogin" to={{pathname: `/populateGallery/${this.props.location.state}`, state: this.props.location.state}}>Add photo to gallery</NavLink>
             </div>
            </div>
            <div className="row">
                <div className="col-sm-6 col-md-4 py-5 " > 
                  <ListOfPhotos></ListOfPhotos>
                </div>
            </div>
            </div>
           
               
            
        );
    }
   
}

         
     

