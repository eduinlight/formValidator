import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Pages from './pages';
//STYLES
import './styles.css';

ReactDOM.render(
  <Router>
    <Pages />
  </Router>
, document.getElementById('root'));
registerServiceWorker();
