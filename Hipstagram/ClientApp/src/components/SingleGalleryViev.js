import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ListOfPhotos } from './ListOfPhotos'
export class SingleGalleryViev extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                <div className="col-sm-6 col-md-12 py-5 text-center" > 
                        <h3>Gallery number: {this.props.match.params.id}</h3>
                        <NavLink tag={Link} className="text-dark goToLogin" to={{ pathname: `/populateGallery/${this.props.match.params.id}`, state: this.props.location.state}}>Add photo to gallery</NavLink>
             </div>
            </div>
            <div className="row">
                <div className="col-sm-6 col-md-12 py-5 " > 
                        <ListOfPhotos api={`/api/galleries/${this.props.match.params.id}/photos`}></ListOfPhotos>
                </div>
            </div>
            </div>
           
               
            
        );
    }
   
}

         
     

