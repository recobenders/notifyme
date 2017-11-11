import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Landing from "./components/views/Landing";

ReactDOM.render(<Landing />, document.getElementById('root'));
registerServiceWorker();
