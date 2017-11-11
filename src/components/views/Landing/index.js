import React, { Component } from 'react';
import SearchContainer from "../../containers/SearchContainer";

class Landing extends Component {

    render() {
        return (
            <div>
                <h2>Landing view</h2>
                <SearchContainer />
            </div>
        );
    }
}

export default Landing;