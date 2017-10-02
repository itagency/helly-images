import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import './uploadpage.css';

export default class UploadPage extends React.Component {
  render() {
    return (
      <div className="uploadpage-form">
        <div className="uploadpage-intro">
          <h1>Send your photos</h1>
          <p>Share your photos with everyone at the event. Simply fill out the form below to submit your images for approval.</p>
        </div>
        <Form>
          <FormGroup>
            <Label for="uploaderName">Name*</Label>
            <Input type="text" name="uploaderName" id="uploaderName" placeholder="John Doe" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">Image*</Label>
            <Input type="file" name="file" id="exampleFile" />
            <FormText color="muted">
              This is some placeholder block-level help text for the above input.
              It's a bit lighter and easily wraps to a new line.
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description*</Label>
            <Input type="textarea" name="text" id="description" />
          </FormGroup>
          <Button color="primary" size="lg" block>Submit</Button>
        </Form>
      </div>
    );
  }
};
