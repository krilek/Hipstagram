import React, { Component } from 'react';
import { authHeader } from '../helpers/auth-header.js';
export class photoUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            File: null,
            Title: '',
            Description: '',
            Message: ''
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
        this.setState({Message: ""})
        e.preventDefault(); // Stop form submit
        this.photoUpload(Object.assign({}, this.state)).then((response) => {
            if (response.ok) {
                this.setState({Message: "Photo added."})
            }
        });
    }
    onChange(e) {
        this.setState({
            File: e.target.files[0]
        });
    }
    photoUpload(data) {
        const url = '/api/photos';
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
            <div className="col-md-6 col-md-offset-3">
                    <h2>Add photo</h2>
                    <form onSubmit={this.onFormSubmit}>
                        <div className="form-group">
                                <label htmlFor="titleInput"><i class="fas fa-heading"></i> Title:</label>
                                <input name="Title" type="text" value={this.state.Title} onChange={this.handleChange} className="form-control" id="titleInput" aria-describedby="titleHelp" />
                        </div>
                        <div className="form-group">
                        <label htmlFor="descriptionInput"><i class="fas fa-align-left"></i> Description:</label>
                        <input name="Description" type="text" value={this.state.Description}  onChange={this.handleChange} className="form-control" id="descriptionInput" aria-describedby="titleHelp" />
                        </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlFile1"><i class="fas fa-file-alt"></i> Photo file:</label>
                        <input type="file" onChange={this.onChange} className="form-control-file" />
        {this.state.Message !== '' &&
            <small className="form-text text-muted">{this.state.Message}</small>
    }
                    </div>

                    <button type="submit" className="btn btn-primary"><i class="fas fa-file-upload"></i> Upload</button>
                    </form>
            </div>
    )
}

}