import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Main } from '../shared/Main';

window.addEventListener('load', () => {
  ReactDOM.hydrate(<Main />, document.getElementById('react-root'));
});
