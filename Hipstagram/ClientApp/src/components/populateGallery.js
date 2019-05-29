import React, { Component } from 'react';
import { ListOfPhotos } from './ListOfPhotos'
import { Redirect } from 'react-router-dom'
export class populateGallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedPhotos: [],
            err: false,
            galleryId: props.match.params.id,
            reload: false,
            active: false,

        }
    }

    toggleClass = () => {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };
    
    handleClick = (e) => {
        console.log(e);
        const index = this.state.selectedPhotos.indexOf(e);
        if (index === -1) {
            this.state.selectedPhotos.push(e);
        } else {
            this.state.selectedPhotos.splice(index, 1);
        }
        console.log(this.state.selectedPhotos);
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
        }).then(() => { this.setState({
            reload: true
        })})
        
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
                    {this.state.reload && <Redirect to={{ pathname: `/singlegallery/${this.state.galleryId}`, state: this.props.location.state}} />
            }
                <form onSubmit={this.handleSubmit}>
                    <button type="submit" className="btn btn-primary">Add selected photos</button>
                </form>
                    <ListOfPhotos selectable= { true } handlePhotoClick={this.handleClick}></ListOfPhotos>
              </div>
            );
      }
}
 
