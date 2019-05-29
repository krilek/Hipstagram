import React, { Component } from 'react';


export class SinglePhoto extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectable: props.selectable,
            selected: false
        }
    }
   
    render() {
        const {  photoData, clickEvent} = this.props;
        return (
        <div className="col-sm-6 col-md-4 py-5 " >
                <div className={this.state.selected ? 'selected card shadow' : 'card shadow' } onClick={() => {
            if (this.state.selectable) {
                this.setState({ selected: !this.state.selected})
                console.log(this.state.selected);
            }
            clickEvent(photoData.id)
        }} >
    <p className="py-3 text-center mx-5"><strong> {photoData.title}</strong></p>
    <img alt={photoData.title} className="img-fluid" src={photoData.fileName}></img>
    <p className="py-3 text-center  mx-5">{photoData.description}</p>
    </div>
    </div>

)
    }
    
    
}




