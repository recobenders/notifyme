import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div>
                <header>
                    <Link to="/">Home</Link>
                    <Link to="/how-to">How to</Link>
                </header>
            </div>
        );
    }
}

export default App;
