import React, { Component } from 'react';
import { authHeader } from '../helpers/auth-header.js';
import { SinglePhoto } from './SinglePhoto.js';


const API = `/api/photos/`;

export class ListOfPhotos extends Component {

    state = {
        PhotosName: "",
        photos: [],
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

     

    
    handleChange = (e) => {
        const name = e.target.name;
        const type = e.target.type;
        if(type === "text" ) {
          const value = e.target.value;
          this.setState({
            [name]: value
          })
        } 
      }
      

      handleSubmit = (e) => {
        e.preventDefault()
          fetch(API, {
                  method: 'POST',
                  headers: {
                      ...{
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  ...authHeader()
              },
            body: JSON.stringify({
                Name: this.state.PhotosName,
            })
          }).then(this.setState({
            PhotosName: ""
          }))
          this.updateGalleries();
      }
      
      
    


  

  render () {

     const photos = this.state.photos.map(data => <SinglePhoto key={data.id} id={data.id} data={data.name}/> )
         
     
    return (
      <div className="container">
          <div className="row">
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className='form-group'>
                            <label htmlFor="GalleryName"> Gallery Name:
                                <input type="text"
                                        id="GalleryName"
                                        name="GalleryName"
                                        value={this.state.GalleryName}
                                        onChange={this.handleChange}
                                        className="form-control"  /> 
                            </label>
                        </div>
                        <div className="form-group">
                                <button className="btn btn-primary addNewGallery ">add</button>
                        </div>
                    </form>
         </div>
         <div className="row"> 
                  {photos}
         </div>  
      </div>
    );
  }
}
