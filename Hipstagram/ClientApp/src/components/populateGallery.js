import React, { Component } from 'react';
import { authHeader } from '../helpers/auth-header.js';
import { SinglePhoto } from './SinglePhoto.js';
const API = `/api/photos/`;
export class populateGallery  extends Component {
    state = {
        photos: [],
        selectedPhotos: [],
        err: false ,
    }

    update(){
        fetch(API,
                {
                    method: 'GET',
                    headers: {
                        ...{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        ...authHeader()
                    }
                })
            .then(response => {
                if (response.ok) {
                    return response
                } throw Error("Something went wrong.")
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState(
                    {
                        photos: data
                    }
                )
            })
            .catch(error => this.setState({
                    err: true,
                })
            )
    }

    componentDidMount() {
         this.update();

    }
    
    handleClick = (e) => {
        this.state.selectedPhotos.indexOf(e) === -1 ? this.state.selectedPhotos.push(e) : console.log("This item already exists");
        console.log(this.state.selectedPhotos)
    }
    
    handleSubmit = (e) => {
        let photos = [];
        for(let i=0; i<this.state.selectedPhotos.length; i++){
            photos.push({Id: this.state.selectedPhotos[i] })
        }
        e.preventDefault();
        fetch("api/galleries/populate", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Gallery: {Id:this.props.location.state},
            Photos: photos
        })
       
    })
    }



  

  render () {

     const photos = this.state.photos.map(data => <SinglePhoto key={data.id} id={data.id} data={data.name} click={this.handleClick} /> )
         
     
    return (
      <div className="container">
          
          <form onSubmit={this.handleSubmit}>
                <button type="submit" class="btn btn-primary">Add selected photos</button>
        </form>
         <div className="row"> 
                  {photos}
         </div>  
      </div>
    );
  }
}
 
