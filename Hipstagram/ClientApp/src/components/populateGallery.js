import React, { Component } from 'react';
import { authHeader } from '../helpers/auth-header.js';
import { SinglePhoto } from './SinglePhoto';
import { ListOfPhotos } from './ListOfPhotos'
const API = `/api/photos/`;
export class populateGallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedPhotos: [],
            err: false,
            galleryId: props.match.params.id
        }
    }
    
    
    handleClick = (e) => {
        this.state.selectedPhotos.indexOf(e) === -1 ? this.state.selectedPhotos.push(e) : console.log("This item already exists");
        console.log(this.state.selectedPhotos)
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const data = this.prepareData();
        fetch("api/galleries/populate", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        
    }

    prepareData() {
        let photos = [];
        for (let i = 0; i < this.state.selectedPhotos.length; i++) {
            photos.push({ Id: this.state.selectedPhotos[i] })
        }
        return {
            Gallery: { Id: this.state.galleryId },
            Photos: photos
        }
    }
      render () {
            return (
              <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <button type="submit" className="btn btn-primary">Add selected photos</button>
                </form>
                    <ListOfPhotos handlePhotoClick={this.handleClick}></ListOfPhotos>
              </div>
            );
      }
}
 
