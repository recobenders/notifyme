import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Item from "./components/views/Item";

ReactDOM.render(<Item />, document.getElementById('root'));
registerServiceWorker();
