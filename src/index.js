import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import routes from './routes';
import TopBar from './components/TopBar'
import 'typeface-roboto'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

class App extends Component {
    render() {
        return (
            <div>
                <TopBar/>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        {routes}
                    </ConnectedRouter>
                </Provider>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root')
);

registerServiceWorker();
