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
           
            </div>
            </div> 
        </div>
      
     )
}

         
     

