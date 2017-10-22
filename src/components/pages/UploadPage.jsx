import React from 'react';
import axios from 'axios';
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
      loadingText: 'Upload Photo'
    };

    this._handleUpload = this._handleUpload.bind(this);
  }

  _handleImageChange(event) {
    event.preventDefault();
    this.setState({
      imagePresent: !this.state.imagePresent
    })
  }

  _handleUpload = (event) => {
    event.preventDefault();

    this.setState({
      loading: true,
      loadingText: 'Loading...'
    })

    let formData = new FormData();
    const imageData = document.querySelector('input[type="file"]').files[0];
    const name = document.getElementById('uploaderName').value;
    const description = document.getElementById('description').value;
    formData.append('imageFile', imageData);
    formData.append('name', name);
    formData.append('description', description);

    axios.post(BASE_URL, formData, { 'content-type': 'multipart/form-data' })
    .then((response) => {
      window.location.replace(response.data.redirect);
      this.setState({
        loading: false,
        loadingText: 'Upload Image'
      })
    })
    .catch((error) => {
      console.log(error);
    });

    // let file = e.target.files[0];

    // const formData = new FormData();

    // formData.append('file', file);
    // formData.append('tags', 'test');

    // console.log(formData);
    // console.log(BASE_URL);
    
  }

  render() {

    return (
      <div className="uploadpage-form">
        <div className="uploadpage-intro">
          <h1>Send your photos</h1>
          <p>Share your photos with everyone at the event. Simply fill out the form below to submit your images for approval.</p>
        </div>
        <Form onSubmit={this._handleUpload}>
          <FormGroup>
            <Label for="uploaderName">Name*</Label>
            <Input type="text" name="uploaderName" id="uploaderName" placeholder="John Doe" />
          </FormGroup>
          <FormGroup className="fileContainer">
            <Input type="file" name="imageFile" id="imageFile" onChange={(e) => this._handleImageChange(e)} />
            <div>Select an image</div>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description*</Label>
            <Input type="textarea" name="description" id="description" placeholder="A description of this photo..." />
          </FormGroup>
          <Link to="/">Cancel upload</Link>
          <div className="grid__upload">
            <button type="submit" className="grid__button" disabled={!this.state.imagePresent || this.state.loading}>{this.state.loadingText}</button>
          </div>
        </Form>
      </div>
    );
  }
};

export default UploadPage;
