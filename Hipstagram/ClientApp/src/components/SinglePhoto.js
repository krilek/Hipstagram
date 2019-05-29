import React from 'react'


export const SinglePhoto = (props) => {
    const {  photoData, clickEvent } = props;

    return (
            <div className="col-sm-6 col-md-4 py-5 " >
                <div className="card shadow" onClick={ () => {clickEvent(photoData.id)} } >
                 
                        <img alt={photoData.title} className="img-fluid" src={photoData.fileName}></img>
                 
                </div>
            </div>

     )
}




