import React from 'react';
import ReactDOM from 'react-dom'; // Change this line
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Use the old ReactDOM.render API for React 17 and below
const container = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  container
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
