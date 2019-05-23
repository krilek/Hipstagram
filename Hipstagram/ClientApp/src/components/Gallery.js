import React, { Component } from 'react';

export class Gallery extends Component {

    state = {
        GalleryName: "",
        gallery: [],
        err: false
        
    }

    componentDidMount() {
        // updateGalleries();

    }

    // updateGalleries() {
    //     const API = ``;
    //     fetch(API)
    //         .then(response => {
    //           if(response.ok) {
    //             return response
    //           } throw Error("nie udalo sie")
    //         })
    //         .then(response => response.json())
    //         .then( data => {
    //         this.setState( 
    //             {
    //                name: data
    //             }
    //         )})
            
        
    //         .catch(error => this.setState({
    //             err: true,
    //             })
    //         )
    // }

    
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
        fetch('https://localhost:5001/api/users/register', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                GalleryName: this.state.GalleryName,
            })
          }).then(this.setState({
              GalleryName: ""
          }))

      }
    



  

  render () {
    // const gallerys = this.state.name.map(singleGallery => {
    //     return (
    //         <li>{singleGallery.name}</li>
    //     )
    // })
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
            <ul>
                  {/* {gallerys} */}
            </ul>
         </div>  
      </div>
    );
  }
}
