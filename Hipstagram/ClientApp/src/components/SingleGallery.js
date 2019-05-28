import React from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export const SingleGallery = (props) => {
    const {id} = props.match.params;
    return (
        <div className="col-sm-6 col-md-4 py-5 " > 
            <div className="card" >
                <div className="card-body ">
                    <NavLink tag={Link} className="text-dark goToLogin" to={{pathname: `/singlegallery/${id}`, state: id}}>
                    <p class="h3 text-center py-5">{props.data}</p>
                    </NavLink>
                    <button  type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => props.removeHandler(id)} >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div> 
        </div>
     )
}

         
     

