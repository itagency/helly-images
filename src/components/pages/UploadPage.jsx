import React from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { uploadImage, uploadFailed } from '../../actions';
import {
  Link
} from 'react-router-dom';

import './uploadpage.css';

export class UploadPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagePresent: false
    };
  }

  _handleImageChange(e) {
    e.preventDefault();
    this.setState({
      imagePresent: !this.state.imagePresent
    })
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="" />);
    } else {
      $imagePreview = (<div>Select an image</div>);
    }

    return (
      <div className="uploadpage-form">
        <div className="uploadpage-intro">
          <h1>Send your photos</h1>
          <p>Share your photos with everyone at the event. Simply fill out the form below to submit your images for approval.</p>
        </div>
        <Form action="https://hellyhansen.itagency.ca/upload" method="POST" encType="multipart/form-data">
          <FormGroup>
            <Label for="uploaderName">Name*</Label>
            <Input type="text" name="uploaderName" id="uploaderName" placeholder="John Doe" />
          </FormGroup>
          <FormGroup className="fileContainer">
            <Input type="file" name="imageFile" id="imageFile" onChange={(e) => this._handleImageChange(e)} />
            {$imagePreview}
          </FormGroup>
          <FormGroup>
            <Label for="description">Description*</Label>
            <Input type="textarea" name="description" id="description" placeholder="A description of this photo..." />
          </FormGroup>
          <Link to="/">Cancel upload</Link>
          <div className="grid__upload">
            <button type="submit" className="grid__button" disabled={!this.state.imagePresent}>Upload Photo</button>
          </div>
        </Form>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  upload: state.upload
});

const mapDispatchToProps = {
  uploadImage,
  uploadFailed
};

const UploadPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadPage);

export default UploadPageContainer;