import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
var Task = [];
window.task = [];
window.previous = [];
ReactDOM.render(<App />, document.querySelector('#root'))