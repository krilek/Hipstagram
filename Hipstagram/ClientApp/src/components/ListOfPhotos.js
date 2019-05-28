import React, { Component } from 'react';
import { authHeader } from '../helpers/auth-header.js';
import { SinglePhoto } from './SinglePhoto.js';

export class ListOfPhotos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            API: this.props.api == null ? `/api/photos/` : this.props.api,
            photos: [],
            err: false,
        }
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
      const photos = this.state.photos.map(data => <SinglePhoto key={data.id} photoData={data} clickEvent={this.props.handlePhotoClick == null ? () => { } : this.props.handlePhotoClick} /> )
      return (
         <div className="row"> 
                  {photos}
         </div>
    );
  }
}
