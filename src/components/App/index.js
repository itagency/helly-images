import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Pages from '../pages';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Pages.GridPage} />
        <Route path="/upload_image" component={Pages.UploadPage} />
      </div>
    </Router>
  )
}

export default App;
