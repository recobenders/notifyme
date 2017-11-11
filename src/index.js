import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import routes from './routes';
import 'typeface-roboto'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {routes}
        </ConnectedRouter>
    </Provider>, document.getElementById('root')
);

registerServiceWorker();
