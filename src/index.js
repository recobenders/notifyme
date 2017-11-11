import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import ItemList from "./components/views/ItemList";

ReactDOM.render(<ItemList />, document.getElementById('root'));
registerServiceWorker();
