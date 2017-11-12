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
    handleTutorialOnClick = () => {
        history.push({
                pathname: "/how-it-works",
            }
        );
    };

    render() {
        return (
            <div>
                <div onClick={this.handleTutorialOnClick} className="corner-ribbon top-right sticky blue shadow">
                    <a>Tutorial</a>
                </div>
                <TopBar history={history}/>
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

window.HACKBIT_VOTING_WIDGET.render(null);
registerServiceWorker();
