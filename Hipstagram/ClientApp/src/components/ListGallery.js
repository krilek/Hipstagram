import React, { Component } from 'react';
import { authHeader } from '../helpers/auth-header.js';
import {SingleGallery} from './SingleGallery'
const API = `/api/galleries`;

export class Gallery extends Component {

    state = {
        GalleryName: "",
        gallery: [],
        err: false ,
    }

    updateGalleries(){
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
                this.setState(
                    {
                        gallery: data
                    }
                )
            })
            .catch(error => this.setState({
                    err: true,
                })
            )
    }

    componentDidMount() {
         this.updateGalleries();

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
                Name: this.state.GalleryName,
            })
          }).then(this.setState({
              GalleryName: ""
          }))
          this.updateGalleries();
      }
      
      
    


  

  render () {

     const gallerys = this.state.gallery.map(data => <SingleGallery key={data.id} id={data.id} data={data.name}/> )
         
     
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
                  {gallerys}
         </div>  
      </div>
    );
  }
}