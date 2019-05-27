import React, { Component } from 'react';
import { authHeader } from '../helpers/auth-header.js';
export class PopulateGallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            File: null,
            Title: '',
            Description: ''
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.photoUpload = this.photoUpload.bind(this);
    }
    handleChange = (e) => {
        
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    onFormSubmit(e) {
        e.preventDefault(); // Stop form submit
        this.photoUpload(this.state).then((response) => {
            //Response 200 good
        });
    }
    onChange(e) {
        this.setState({
            File: e.target.files[0]
        });
    }
    photoUpload(data) {
        const url = 'https://localhost:5001/api/photos';
        const formData = this.getFormData(data);
        
        const config = {
            method: 'POST',
            headers: authHeader(),
            body: formData
        };
        
        return fetch(url, config);
    }

    getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => {
            
            formData.append(key, object[key])
        });
        return formData;
    }
    render() {
        return (
        <form onSubmit={this.onFormSubmit}>
            <h1>File Upload</h1>
                Title:
            <input name="Title" value={this.state.Title} className="form-control" onChange={this.handleChange} />
                Description:
            <input name="Description" value={this.state.Description} className="form-control" onChange={this.handleChange} />
            <input type="file" onChange={this.onChange} />
            <button type="submit">Upload</button>
            </form>
    )
}

}