import React, { Component } from 'react';
import { authHeader } from '../helpers/auth-header.js';
import { SinglePhoto } from './SinglePhoto.js';

export class ListOfPhotos extends Component {

    state = {
        API: this.props.api !== null ? this.props.api : `/api/photos/`,
        photos: [],
        err: false,
    }

    update() {
        fetch(this.state.API,
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

     

    

      

      
      
      
    


  

  render () {

     const photos = this.state.photos.map(data => <SinglePhoto key={data.id} id={data.id} data={data.name}/> )
         
     
    return (
      <div className="container">
          
     
         <div className="row"> 
                  {photos}
         </div>  
      </div>
    );
  }
}
