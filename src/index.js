import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Wrapper from './Components/Body/Wrapper';
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

