import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Pages from './components/pages';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Grid</Link></li>
          <li><Link to="/upload">Upload</Link></li>
        </ul>
        <hr/>
        <Route exact path="/" component={Pages.GridPage} />
        <Route path="/upload" component={Pages.UploadPage} />
      </div>
    </Router>
  )
}

export default App;
