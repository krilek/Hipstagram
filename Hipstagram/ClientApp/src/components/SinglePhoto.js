import React, { Fragment } from 'react'


export const SinglePhoto = (props) => {
    const {id, click} = props
     

    


    return (
        <Fragment>
            
            <div className="col-sm-6 col-md-4 py-5 " > 
            <div className="card" onClick={ () => {click(id)} } >
                
                <div className="card-body ">
                <h5 className="card-title">{id}</h5>
                <img  className="img-fluid" src="uploads\946b619c-7821-4bd9-b09d-543f6eafc2d7.jpg"></img>
            
                </div>
                </div> 
            </div>
        
       
        </Fragment>
      
     )
}

         
     

