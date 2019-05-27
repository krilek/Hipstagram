import React from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
export const SingleGallery = (props) => {
    const {id} = props
    return (
        <div className="col-sm-6 col-md-4 py-5 " > 
            <div className="card" >
                <div className="card-body ">
                    <NavLink tag={Link} className="text-dark goToLogin" to={`/singlegallery/${id}`}>
                        <h2 className="card-title">{props.data}</h2>
                    </NavLink>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => props.removeHandler(id)} >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div> 
        </div>
     )
}

         
     

