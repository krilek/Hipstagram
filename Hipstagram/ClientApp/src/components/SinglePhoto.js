import React, { Fragment } from 'react'


export const SinglePhoto = (props) => {
    const { key, photoData, clickEvent } = props;

    return (
            <div className="col-sm-6 col-md-4 py-5 " >
                <div className="card" onClick={ () => {clickEvent(photoData.id)} } >
                    <div className="card-body ">
                        <h5 className="card-title">{photoData.id}</h5>
                        <img alt={photoData.title} className="img-fluid" src={photoData.fileName}></img>
                    </div>
                </div>
            </div>

     )
}




