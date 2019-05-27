import React from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export const SinglePhoto = (props) => {
    const {id} = props
     
    return (
        
      
        <div className="col-sm-6 col-md-4 py-5 " > 
        <div className="card" >
            
            <div className="card-body ">
            <h5 className="card-title">{id}</h5>
            <img  className="img-fluid" src="uploads\946b619c-7821-4bd9-b09d-543f6eafc2d7.jpg"></img>
         
            </div>
            </div> 
        </div>
      
     )
}

         
     

