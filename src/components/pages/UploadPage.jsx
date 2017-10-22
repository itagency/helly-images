import React from 'react';
import axios from 'axios';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {
  Link
} from 'react-router-dom';

import './uploadpage.css';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/upload' : 'https://hellyhansen.itagency.ca/upload'

class UploadPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagePresent: false,
      loading: false,
      loadingText: 'Upload Photo',
      successMessage: '',
      uploadFailed: true
    };

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.state.uploadFailed) {
      setTimeout(() => {
        this.setState({
          successMessage: '',
          uploadFailed: false
        })
      }, 5000)
    }
  }

  _handleImageChange(event) {
    event.preventDefault();
    this.setState({
      imagePresent: !this.state.imagePresent
    })
  }

  _handleSubmit = (event, values) => {
    event.preventDefault();

    this.setState({
      loading: true,
      loadingText: 'Loading...'
    })

    let formData = new FormData();
    let imageData = document.querySelector('input[type="file"]').files[0];
    let name = document.getElementById('uploaderName').value;
    let description = document.getElementById('description').value;
    formData.append('imageFile', imageData);
    formData.append('name', name);
    formData.append('description', description);

    axios.post(BASE_URL, formData, { 'content-type': 'multipart/form-data' })
    .then((response) => {
      window.location.replace(response.data.redirect);
      this.setState({
        loading: false,
        loadingText: 'Upload Image',
        successMessage: 'Upload success... redirecting.'
      })
    })
    .catch((error) => {
      console.log(error);
      formData = {};
      imageData = [];
      name = '';
      description = '';
      this.setState({
        loading: false,
        loadingText: 'Upload Image',
        successMessage: 'Upload failed... please try again.',
        uploadFailed: true
      })
    });
  }

  render() {

    return (
      <div className="uploadpage-form">
        <div className="uploadpage-intro">
          <h1>Send your photos</h1>
          <p>Share your photos with everyone at the event. Simply fill out the form below to submit your images for approval.</p>
        </div>
        <AvForm onSubmit={this._handleSubmit}>
          <FormGroup>
            <AvField 
              type="text" 
              label="Name*" 
              name="uploaderName" 
              id="uploaderName" 
              placeholder="John Doe" 
              validate={{maxLength: {value: 30}, minLength: {value: 3}}} 
              required />
          </FormGroup>
          <FormGroup>
            <AvField 
              type="textarea" 
              label="Description*" 
              name="description" 
              id="description" 
              placeholder="A short description of this photo..."
              validate={{maxLength: {value: 70}, minLength: {value: 5}}}
              required />
          </FormGroup>
          <FormGroup className="fileContainer">
            <Input type="file" name="imageFile" id="imageFile" onChange={(e) => this._handleImageChange(e)} />
            <div>Select an image</div>
          </FormGroup>
          <div className="grid__upload">
            <Link to="/" className="cancel-button">Cancel upload</Link>
            <p className={`success-text${this.state.uploadFailed ? ' failed' : ''}`}>{this.state.successMessage}</p>
            <button type="submit" className="grid__button" disabled={!this.state.imagePresent || this.state.loading}>{this.state.loadingText}</button>
          </div>
        </AvForm>
      </div>
    );
  }
};

export default UploadPage;
