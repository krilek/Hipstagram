import React from 'react'


export const SinglePhoto = (props) => {
    const {  photoData, clickEvent} = props;

    return (
            <div className="col-sm-6 col-md-4 py-5 " >
                <div className="card shadow" onClick={ () => {clickEvent(photoData.id)} } >
                <p className="py-3 text-center mx-5"><strong> {photoData.title}</strong></p>
                <img alt={photoData.title} className="img-fluid" src={photoData.fileName}></img> 
                <p className="py-3 text-center  mx-5">{ photoData.description}</p>
    </div>
            </div>

     )
}




