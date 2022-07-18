import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MainComponent from '../shared/Main';

window.addEventListener('load', () => { // eslint-disable-line
  ReactDOM.hydrate(<MainComponent />, document.getElementById('react-root')); // eslint-disable-line
});
